const { logger } = require('../../utils/logger');
const { createTableUsers: createTableUsersQuery, createTableProducts: createTableProductsQuery, createTableCategories: createTableCategoriesQuery } = require('../queries');

(() => {
    require('../../config/db.config').query(createTableUsersQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table users created!');
    });

    require('../../config/db.config').query(createTableCategoriesQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table categories created!');
    });

    require('../../config/db.config').query(createTableProductsQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table products created!');
        process.exit(0);
    });
})();
