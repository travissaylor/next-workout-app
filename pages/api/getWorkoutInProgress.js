const db = require('../../lib/db');
const escape = require('sql-template-strings');

const GetWorkoutInProgress = async function(req, res) {
   
    const mapedWorkout = function(template, log, temp_ex, log_ex) {
        var workout = {
            split_type: template.split_type,
            session_type: template.session_type,
            total_time: log.total_time,
            status: log.curent,
            date: log.date,
        };

        var exercises = [];

        temp_ex.forEach(function(exercise, index) {
            var ex_item = {
                id: exercise.id,
                name: exercise.name,
                muscle_group: exercise.muscle_group,
                sets: (log_ex[index]) ? log_ex[index].sets : exercise.sets
            }
            exercises.push(ex_item);
        });

        return {'workout': workout, 'exercises': exercises};
    }

    const workout_template = await db.query(escape`
        SELECT split_type, session_type
        FROM workout_templates
        Where id=${req.query.id}
    `);

    const template_exercises = await db.query(escape`
        SELECT *
        FROM template_exercises
        Where template_id=${req.query.id}
    `);

    const logged_workout = await db.query(escape`
        SELECT *
        FROM workout_logs
        Where id=${req.query.id}
    `);

    const logged_exercises = await db.query(escape`
        SELECT *
        FROM logged_exercises
        Where log_id=${req.query.id}
    `);

    if(workout_template.error || template_exercises.error || logged_workout.error || logged_exercises.error) {
        res.status(500).json({'error': 'Cannot Get Data'});
        return;
    }

    const data = mapedWorkout(workout_template[0], logged_workout[0], template_exercises, logged_exercises);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
}

export default GetWorkoutInProgress;