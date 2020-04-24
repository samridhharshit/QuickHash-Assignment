const jwt = require('jsonwebtoken');
const secret = require('../config');
console.log(secret.secretValue);

const withAuth = (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
        res.status(403).send('Unauthorized: No token provided');
    } else {
        jwt.verify(
            token,
            secret.secretValue,
            (err, payload) => {
                if (err) {
                    res.status(401).send('Unauthorized: Invalid token');
                } else {
                    // console.log('inside with Auth middleware');
                    req.email = payload.email;
                    req.userId = payload.userId;
                    next();
                }

            }
        )
    }
};

module.exports = withAuth;