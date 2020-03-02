import SetsModule from '../../components/workoutInProgress/setsModule';

const db = require('../../lib/db');
const escape = require('sql-template-strings');

const PostWorkout = async function(req, res) {

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