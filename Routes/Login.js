const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// importing db
const con = require('../Database/db');
const secret = require('../config.js');

const LoginUser = (req, res) => {
    const {email, password} = req.body;
    // console.log(email[0], password[0]);

    con.query(
        `select * from user where email = ?`,
        [email[0]],
        (err, user) => {
            if (user.length === 0) {
                res.status(500).json('Incorrect email');
            } else if (user.length > 0) {
                bcrypt.compare(password[0], user[0].password, (err, result) => {
                    if (err) res.status(400).json({error: err});
                    if (result === false) {
                        res.status(401).json('Incorrect Password');
                    } else {
                        const payload = {
                            email: email[0],
                            userId: user[0].userId,
                            name: user[0].name
                        };
                        const token = jwt.sign(payload, secret.secretValue, {expiresIn: '10m'});
                        // console.log(token);
                        res.cookie('token', token, {httpOnly: true})
                            .end(JSON.stringify(payload.name));
                        // console.log(result);
                        // res.status(200);
                    }
                })
            }
        }
    )
};


module.exports = LoginUser;