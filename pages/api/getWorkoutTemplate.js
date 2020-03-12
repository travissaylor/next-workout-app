const db = require('../../lib/db');
const escape = require('sql-template-strings');

const GetWorkoutTemplate = async function(req, res) {

    const workout = await db.query(escape`
        SELECT *
        FROM workout_logs
        Where log_id=${req.query.id}
    `);

    const exercises = await db.query(escape`
        SELECT *
        FROM logged_exercises
        Where log_id=${req.query.id}
    `);

    if(workout.error || exercises.error) {
        res.status(500);
        return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ 'workout': workout[0], 'exercises': exercises });
}

export default GetWorkoutTemplate;