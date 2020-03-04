const db = require('../../lib/db');
const escape = require('sql-template-strings');

const GetExerciseTemplates = async function(req, res) {

    console.log('req query', req.query.term);
    const exercises = await db.query(`
        SELECT *
        FROM template_exercises
        WHERE name LIKE '%${req.query.term}%';
    `);

    console.log(exercises);

    if(exercises.error) {
        res.status(500);
        res.end();
        return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ 'exercises': exercises });
}

export default GetExerciseTemplates;