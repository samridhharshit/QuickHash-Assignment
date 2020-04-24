// hash creating library
const bcrypt = require('bcryptjs');

// importing db
const con = require('../Database/db');

const registerUser = async (req, res) => {
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const credentials = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    };

    con.query(`insert into user set ?`,
        [credentials],
        (err, result) => {
            if (err) res.status(500).json({error: 'Bad Request'});
            res.status(200).json(result);
        }
    )
};

module.exports = registerUser;