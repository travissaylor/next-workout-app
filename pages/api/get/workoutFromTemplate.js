const db = require('../../../lib/db');
const escape = require('sql-template-strings');

const GetWorkoutFromTemplate = async function(req, res) {

    const mapTemplateToLog = function(workout_template, template_exercises, workout_log_count, logged_exercise_count, user_id) {
        var workoutLog = {
            workout: {
                log_id: workout_log_count + 1,
                user_id: user_id,
                total_time: 0,
                split_type: workout_template.split_type,
                session_type: workout_template.session_type,
                date: null,
                status: 'in-progress',
            },
            exercises: []
        }

        var current_log_ex_id = logged_exercise_count + 1;
        template_exercises.forEach(function(exercise, index) {
            var newExercise = {
                log_ex_id: current_log_ex_id,
                log_id: workout_log_count + 1,
                name: exercise.name,
                muscle_group: exercise.muscle_group,
                user_id: user_id,
                sets: exercise.sets
            };

            workoutLog.exercises.push(newExercise);
            current_log_ex_id++;
        });

        return workoutLog;
    }
    
    const workout_template = await db.query(escape`
        SELECT * FROM workout_templates
        WHERE template_id = ${req.query.template_id};
    `);

    if(workout_template.error) {
        res.status(500).json(workout_template.error);
        return;
    }

    const template_exercises = await db.query(escape`
        SELECT * FROM template_exercises
        WHERE template_id = ${req.query.template_id};
    `);

    if(template_exercises.error) {
        res.status(500).json(template_exercises.error);
        return;
    }

    const workout_log_count = await db.query(escape`
        SELECT COUNT(*) FROM workout_logs;
    `);

    const logged_exercises_count = await db.query(escape`
        SELECT COUNT(*) FROM logged_exercises;
    `);

    if(workout_log_count.error) {
        res.status(500).json(workout_log_count.error);
        return;
    }

    const user_id = 1;

    const mapped_workout_log = mapTemplateToLog(workout_template[0], template_exercises, workout_log_count[0]['COUNT(*)'],logged_exercises_count[0]['COUNT(*)'], user_id);
    console.log('mapped_workout_log', mapped_workout_log.exercises[0].sets);

    res.status(200).json(mapped_workout_log);
}

export default GetWorkoutFromTemplate;