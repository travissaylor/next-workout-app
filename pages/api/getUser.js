const db = require('../../lib/db');
const escape = require('sql-template-strings');

const GetUser = async function(req, res) {
    const user = await db.query(escape`
        SELECT *
        FROM users
        Where id=${req.query.id}
        LIMIT 1
    `);

    if(user.error) {
        res.status(500);
        return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ 'user': user[0]});
}

export default GetUser;