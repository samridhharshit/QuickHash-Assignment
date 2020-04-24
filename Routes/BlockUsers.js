// importing db
const con = require('../Database/db');

const BlockUsers = (req, res) => {
    const {name, currentUser} = req.body;
    con.query(`select * from user where name = ?`,
        [currentUser],
        (err, row) => {
            if (err) {
                res.json('User not found!')
            }
            // console.log(row);

            const values = {
                IdOfUserThatBlocked: row[0].userId,
                blockedUser: name,
                blockedByUSer: currentUser
            };

            con.query(`insert into blockedDetails set ?`,
                [values],
                (err, result) => {
                    if (err) {
                        res.json('could not block')
                    }
                    res.json('user Blocked!')
                });
        });

    // res.status(200).json('blocked');
};

module.exports = BlockUsers;