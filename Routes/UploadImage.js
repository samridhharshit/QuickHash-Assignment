// importing db
const con = require('../Database/db');

const UploadImage = (req, res) => {
    if (req.file) {
        // console.log(req.file.filename);
        res.json(req.file);
    }
};

module.exports = UploadImage;