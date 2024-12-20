const db = require('../config/db.config');
const { createNewUser: createNewUserQuery, findByUsername: findByUsernameQuery, createTableUsers: createIfNotExistsQuery } = require('../database/queries');
const { logger } = require('../utils/logger');

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static create(newUser, cb) {
        db.query(createIfNotExistsQuery);
        db.query(createNewUserQuery,
            [
                newUser.username,
                newUser.password
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId
                });
            });
    }

    static findByUsername(username, cb) {
        db.query(findByUsernameQuery, username, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
}

module.exports = User;