// importing db
const con = require('../Database/db');

const GetImages = (req, res) => {
    // console.log(req.params.userName);
    con.query(`select user.image, user.userId, user.name from
                user join blockedDetails
                          on
                              user.name <> ?
               where
                       user.userId not in (select IdOfUserThatBlocked from blockedDetails where blockedUser = ?)
               group by user.userId;`,
        [req.params.userName, req.params.userName],
        (err, rows) => {
            // console.log(rows)
            if (rows.length === 0) {
                con.query(`select * from
                            user
                           where
                               name <> ?`,
                    [req.params.userName],
                    (err, rows) => {
                        if (err) res.status(400).json(err);
                        res.status(200).json(rows);
                    })
            }else {
                if (err) res.status(400).json(err);
                res.status(200).json(rows);
            }
        })
};

module.exports = GetImages;
