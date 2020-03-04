const db = require('../../lib/db');
const escape = require('sql-template-strings');

const PostWorkout = async function(req, res) {

    const dateToMysqlFormat = function(date) {
        var date;
        date = new Date(date);
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2);
        return date;
    }

    const mysqlExerciseQuery = async function(exercises, uid, log_id) {
        // var insert_exercise_log_query = 
        // `INSERT INTO logged_exercises (id, user_id, log_id, name, sets, template_ex_id) VALUES `;

        var insert_exercise_log_query = null;
        console.log("LENGTH",Object.keys(exercises).length);
        var count = 0;
        var exercisesLength = Object.keys(exercises).length;

        for(const exercise in exercises) {
            var insert_exercise_log_query = `INSERT INTO logged_exercises (id, user_id, log_id, name, sets, template_ex_id) 
            VALUES (${exercises[exercise].ex_log_id}, ${uid}, ${log_id}, "${exercises[exercise].name}", '${JSON.stringify({sets: exercises[exercise].sets})}', ${exercises[exercise].id})`;

            insert_exercise_log_query += ` ON DUPLICATE KEY UPDATE sets = '${JSON.stringify({sets: exercises[exercise].sets})}';`
            console.log('Ex QUERY', insert_exercise_log_query);
            const exercise_log_result = await db.query(insert_exercise_log_query);
            if(exercise_log_result.error) {
                return exercise_log_result;
                break;
            }

            count++;
        }


        return 'success';
    }

    const user_id = 1;

    const exercises = JSON.parse(req.query.exercises);
    const workout = JSON.parse(req.query.workout);
    console.log('workout res', workout);
    console.log('exercises res', exercises);

    var status = 'finished';
    for(const exercise in exercises) {
        exercises[exercise].sets.forEach(set => {
            if(set.weight === null || set.reps === null){
                status = 'current';
            }
        });
    };
     console.log('status', status);

    if(workout.log_id === null) {
        console.log('Need to add');
        const insert_workout_log = await db.query(escape`
            INSERT INTO workout_logs (user_id, template_id, total_time, program_id, status, date)
            VALUES (${user_id}, ${workout.template_id}, ${workout.total_time}, ${workout.program_id}, ${status}, ${workout.date});
        `)

        if(insert_workout_log.error) {
            console.log(insert_workout_log.error);
            res.status(500);
            res.end();
            return;
        }

        console.log(insert_workout_log);

        var insert_exercise_log_query = 
        `INSERT INTO logged_exercises (user_id, log_id, name, sets, template_ex_id) VALUES `;

        console.log("LENGTH",Object.keys(exercises).length);
        var count = 0;
        var exercisesLength = Object.keys(exercises).length;


        for(const exercise in exercises) {
            if(count === exercisesLength-1) {
                insert_exercise_log_query += `(${user_id}, ${insert_workout_log.insertId}, "${exercises[exercise].name}", '${JSON.stringify({sets: exercises[exercise].sets})}', ${exercises[exercise].id});`;
            } else {
                insert_exercise_log_query += `(${user_id}, ${insert_workout_log.insertId}, "${exercises[exercise].name}", '${JSON.stringify({sets: exercises[exercise].sets})}', ${exercises[exercise].id}),`;
            }

            count++;
        }

        console.log('Ex QUERY', insert_exercise_log_query);
        const exercise_log_result = await db.query(insert_exercise_log_query);

        if(exercise_log_result.error) {
            console.log(exercise_log_result.error);
            res.status(500).json(exercise_log_result.error);
            res.end();
            return;
        }
        
    } else {
        console.log('Need to update');

        var date = dateToMysqlFormat(workout.date);

        const insert_workout_log = await db.query(escape`
            UPDATE workout_logs
            SET total_time = ${workout.total_time}, status = ${status}, date = ${date}
            WHERE id = ${workout.log_id};
        `)

        if(insert_workout_log.error) {
            console.log(insert_workout_log.error);
            res.status(500).json({insert_workout_log});
            res.end();
            return;
        }

        var exerciseQueryRes = await mysqlExerciseQuery(exercises, user_id, workout.log_id);

        if(exerciseQueryRes.error) {
            console.log(exerciseQueryRes.error);
            res.status(500).json(exerciseQueryRes.error);
            res.end();
            return;
        }

        console.log(exerciseQueryRes);

        res.status(200).json({exerciseQueryRes});

    }

    // const update_workout_log = await db.query(escape`
    //     UPDATE workout_logs
    //     SET user_id = ${user_id}, template_id = ${workout.template_id}, total_time = ${workout.total_time}, status = ${status}
    //     WHERE id = ${workout.log_id};
    // `)

    res.status(200);
    res.end();

}

export default PostWorkout;