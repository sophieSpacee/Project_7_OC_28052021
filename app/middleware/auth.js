const jwt = require('jsonwebtoken');
const { createPool } = require('mysql2/promise');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM-TOKEN-SECRET');
        const userId = decodedToken.userId;
        console.log(req.body.userId)
        console.log(userId)
        if (req.body.userId && req.body.userId != userId) {
            throw 'User ID non valable';
        } else {
            next();
        }
        }
     catch (error) {
        res.status(401).json({error: 'Unauthorized'})
    }
};