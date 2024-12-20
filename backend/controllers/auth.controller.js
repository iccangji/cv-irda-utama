const User = require('../models/user.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');
exports.signup = (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = hashPassword(password.trim());

    const user = new User(username.trim(), hashedPassword);
    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                data: {
                    data
                }
            });
        }
    });
};

exports.signin = (req, res) => {
    const { username, password } = req.body;
    User.findByUsername(username.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with username ${username} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            if (comparePassword(password.trim(), data.password)) {
                const token = generateToken(data.username);
                res.cookie('authToken', token, { httpOnly: true, sameSite: 'lax' });
                res.status(200).send({
                    token,
                    username: data.username
                });
                return;
            }
            res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            });
        }
    });
}
exports.signout = (req, res) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });
    res.status(200).send({ message: 'Logout berhasil' });
};

exports.verify = (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (token !== undefined) {
        res.status(200).send({
            status: 'success',
            message: 'token valid'
        });
    } else {
        res.status(500).send({
            status: 'error',
            message: 'token invalid'
        });
    }
};

