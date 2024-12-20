const db = require('../config/db.config');
const {
    getAllCategories: getAllCategoriesQuery,
    createNewCategory: createNewCategoryQuery,
    updateCategory: updateCategoryQuery,
    deleteCategory: deleteCategoryQuery
} = require('../database/queries');
const { logger } = require('../utils/logger');

class Category {
    constructor(name) {
        this.name = name;
    }

    static getAll(cb) {
        db.query(getAllCategoriesQuery, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
        });
    }


    static create(newCategory, cb) {
        db.query(createNewCategoryQuery,
            [
                newCategory.name
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.id
                });
            });
    }

    static update(newCategory, id, cb) {
        db.query(updateCategoryQuery,
            [
                newCategory.name, id
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.id
                });
            });
    }

    static destroy(id, cb) {
        db.query(deleteCategoryQuery,
            [id], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.id
                });
            });
    }
}

module.exports = Category;