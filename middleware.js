const jwt = require('jsonwebtoken');
const config = require('./config.js');

exports.checkToken = (req, res, next) => {
    const authHeader = req.headers['x-access-token'] || req.headers['authorization'];
    if(authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, config.secret, (error, authData) => {
            if(error) {
                res.status(403).send('Authorization token could not be verified');
            } else {
                req.authData = authData;
                next();
            }
        });
    } else {
        res.status(403).send('Authorization token missing');
    }
}