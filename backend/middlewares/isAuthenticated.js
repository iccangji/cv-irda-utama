const { JWT_SECRET_KEY } = require('../utils/secrets');
const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.authToken || req.headers['authorization'].split(' ')[1];

        if (!token) {
            res.status(500).send({
                status: "error",
                message: "Token tidak valid"
            });
            return;
        }

        jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(500).send({
                    status: "error",
                    message: "Token tidak valid"
                });
                return;
            }
            next();
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error
        });
        return;
    }
}

module.exports = {
    isAuthenticated
}