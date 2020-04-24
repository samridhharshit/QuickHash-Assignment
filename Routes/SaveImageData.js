// importing db
const con = require('../Database/db');

const SaveImageData = (req, res) => {
    // console.log(req.body);
    const {filename, params} = req.body;
    // res.status(200).json('Uploaded')
    con.query(`update user set image = ? where name = ?`,
        [filename, params],
        (err, result) => {
            console.log(result);
            if (err) res.status(400).json('Uploading Unsuccessful! Try again');
            res.status(200).json('Uploaded')
        }
    );
};

module.exports = SaveImageData;