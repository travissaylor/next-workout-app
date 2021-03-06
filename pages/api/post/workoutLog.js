const db = require('../../../lib/db');
const escape = require('sql-template-strings');

const PostWorkoutLog =  async function(req, res) {

    const dateToMysqlFormat = function() {
        var date;
        date = new Date();
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2)+ " " + 
            ('00' + date.getUTCHours()) + ":" + 
            ('00' + date.getUTCMinutes()) + ":" + 
            ('00' + date.getUTCSeconds());
        return date;
    }

    const calcWorkoutStatus = function(exercises) {
        var status = 'finished';
        for(const exercise in exercises) {
            if(!Array.isArray(exercises[exercise].sets)) {
                const setCount = exercises[exercise].sets;
                exercises[exercise].sets = [];
                for(var i=0; i<setCount-1; i++) {
                    exercises[exercise].sets.push({weight: null, reps: null, note: ''});
                }
                status = 'current';
            } else {
                exercises[exercise].sets.forEach(set => {
                    if(set.weight === null || set.reps === null){
                        status = 'current';
                    }
                });
            }
        };

        return status;
    }

    const insertUpdateWorkoutLog = async function(workout, user_id) {
        const insert_workout_log = await db.query(escape`
            INSERT INTO workout_logs (log_id, user_id,  total_time, program_id, status, date, split_type, session_type)
            VALUES (${workout.log_id}, ${user_id}, ${workout.total_time}, ${workout.program_id}, ${workout.status}, ${workout.date}, ${workout.split_type}, ${workout.session_type})
            ON DUPLICATE KEY UPDATE 
            total_time = ${workout.total_time}, program_id = ${workout.program_id}, status = ${workout.status}, date = ${workout.date},  split_type = ${workout.split_type}, session_type = ${workout.session_type};
        `);

        return(insert_workout_log);
    }

    const insertUpdateExerciseLog = async function(exercises, source, user_id) {
        var error = null;
       
        error = exercises.forEach(async function(exercise) {
            const insert_logged_exercise = await db.query(escape`
                INSERT INTO logged_exercises (log_ex_id, log_id, name, sets, user_id, muscle_group)
                VALUES (${exercise.log_ex_id}, ${exercise.log_id}, ${exercise.name}, ${JSON.stringify({sets: exercise.sets})}, ${user_id}, ${exercise.muscle_group})
                ON DUPLICATE KEY UPDATE 
                log_id = ${exercise.log_id}, name = ${exercise.name}, sets = ${JSON.stringify({sets: exercise.sets})}, muscle_group = ${exercise.muscle_group};
            `);

            if(insert_logged_exercise.error) {
                console.log("insert_logged_exercise", insert_logged_exercise)
                return(insert_logged_exercise.error);
            }
        })
        

        if(error) {
            return error;
        }

        return true;
    }

    const updateUserCurrentWorkout = async function(workout_log_id, user_id) {
        
        const insert_user_current_workout = await db.query(escape`
            UPDATE users
            SET current_workout_id = ${workout_log_id}
            WHERE id = ${user_id};
        `);

        return(insert_user_current_workout);
    }

    const user_id = 2;

    var exercises = JSON.parse(req.query.exercises);
    var workout = JSON.parse(req.query.workout);

    console.log('Exercises', exercises);
    console.log('workout', workout);


    workout.status = calcWorkoutStatus(exercises);

    workout.date = dateToMysqlFormat();

    const insert_update_workout = await insertUpdateWorkoutLog(workout, user_id);
    if(insert_update_workout.error) {
        res.status(500).json(insert_update_workout.error);
        return;
    }

    const insert_update_exercises = await insertUpdateExerciseLog(exercises, workout.source, user_id);

    if(insert_update_exercises.error) {
        res.status(500).json(insert_update_exercises.error);
        return;
    }

    const update_user_current_workout = await updateUserCurrentWorkout(workout.log_id, user_id);

    if(update_user_current_workout.error) {
        res.status(500).json(update_user_current_workout.error);
    }

    res.status(200).json(insert_update_workout);
    res.end();
}

export default PostWorkoutLog;