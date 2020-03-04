const db = require('../../lib/db');
const escape = require('sql-template-strings');

const GetWorkoutInProgress = async function(req, res) {
    const dateToMysqlFormat = function() {
        var date;
        date = new Date();
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2);
        return date;
    }
   
    const mapedWorkout = function(template, log, temp_ex, log_ex) {
        var workout = {};
        if(!template) {
            res.status(401);
            res.end();
            return;
        }
        if(log) {
            workout = {
                split_type: template.split_type,
                session_type: template.session_type,
                total_time: log.total_time,
                status: log.status,
                date: log.date,
                template_id: parseInt(req.query.id),
                log_id: log.id,
                program_id: template.program_id
            };
        } else {
            workout = {
                split_type: template.split_type,
                session_type: template.session_type,
                total_time: template.total_time,
                status: 'current',
                date: dateToMysqlFormat(),
                template_id: parseInt(req.query.id),
                log_id: null,
                program_id: template.program_id
            };
        }
        
        var exercises = [];

        temp_ex.forEach(function(exercise, index) {
            var sets = [];
            var ex_log_id = null;
            if(log_ex[index]) {
                ex_log_id = log_ex[index].id;
                sets = JSON.parse(log_ex[index].sets).sets;
            } else {
                for(var i=0; i<exercise.sets-1; i++) {
                    sets[i] = {weight: null, reps: null, notes: ''}
                }
            }
            var ex_item = {
                id: exercise.id,
                ex_log_id: ex_log_id,
                name: exercise.name,
                muscle_group: exercise.muscle_group,
                sets: sets
            }
            exercises.push(ex_item);
        });

        return {'workout': workout, 'exercises': exercises};
    }

    const workout_template = await db.query(escape`
        SELECT program_id, split_type, session_type
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
        Where template_id=${req.query.id}
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