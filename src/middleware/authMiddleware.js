const jwt = require('jsonwebtoken');
const { secret } = require('../../config/auth.config');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token == null) return res.status(401);

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next(); 
    });
};

module.exports = authenticateToken;
