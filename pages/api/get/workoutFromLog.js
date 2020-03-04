const db = require('../../../lib/db');
const escape = require('sql-template-strings');

const GetWorkoutFromLog = async function(req, res) {

    const mapLogToLog = function(workout_log, logged_exercises, user_id) {
        console.log('workout_log', workout_log.log_id);
        var workoutLog = {
            workout: {
                log_id: workout_log.log_id,
                user_id: user_id,
                total_time: workout_log.total_time,
                split_type: workout_log.split_type,
                session_type: workout_log.session_type,
                date: workout_log.date,
                status: workout_log.status,
            },
            exercises: []
        }

        logged_exercises.forEach(function(exercise, index) {
            var newExercise = {
                log_ex_id: exercise.log_ex_id,
                log_id: exercise.log_id,
                name: exercise.name,
                muscle_group: exercise.muscle_group,
                user_id: user_id,
                sets: JSON.parse(exercise.sets).sets
            };

            workoutLog.exercises.push(newExercise);
        });

        return workoutLog;
    }
    
    const workout_log = await db.query(escape`
        SELECT * FROM workout_logs
        WHERE log_id = ${req.query.log_id};
    `);

    if(workout_log.error) {
        res.status(500).json(workout_log.error);
        return;
    }

    const logged_exercises = await db.query(escape`
        SELECT * FROM logged_exercises
        WHERE log_id = ${req.query.log_id};
    `);

    if(logged_exercises.error) {
        res.status(500).json(logged_exercises.error);
        return;
    }

    const user_id = 1;

    const mapped_workout_log = mapLogToLog(workout_log[0], logged_exercises, user_id);

    res.status(200).json(mapped_workout_log);
}

export default GetWorkoutFromLog;