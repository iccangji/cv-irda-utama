const mysql = require('mysql');
const { logger } = require('../utils/logger');
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = require('../utils/secrets');

let connection;

function handleDisconnect() {
    connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME
    });

    connection.connect((err) => {
        if (err) {
            logger.error('Error connecting to database:', err.message);
            setTimeout(handleDisconnect, 2000); // reconnect database 2 detik
        } else {
            logger.info('Database connected');
        }
    });

    connection.on('error', (err) => {
        logger.error('Database error:', err.message);

        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            logger.warn('Koneksi MySQL terputus, mencoba reconnect...');
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = connection;