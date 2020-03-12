const db = require('../../lib/db');
const escape = require('sql-template-strings');

const GetWorkoutTemplate = async function(req, res) {

    const program = await db.query(escape`
        SELECT *
        FROM workout_programs
        Where program_id=${req.query.id}
    `);

    const phases = await db.query(escape`
        SELECT *
        FROM workout_program_phases
        Where program_id=${req.query.id}
    `);

    if(program.error || phases.error) {
        res.status(500);
        return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ 'program': program[0], 'phases': phases });
}

export default GetWorkoutTemplate;