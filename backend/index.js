const app = require('./app');
const { logger } = require('./utils/logger');

const HOSTNAME = 'localhost';
const PORT = process.env.PORT || 5000;

app.listen(PORT, HOSTNAME, () => {
    logger.info(`Running on PORT ${PORT}`);
});