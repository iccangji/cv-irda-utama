const db = require('../config/db.config');
const {
    getAllProducts: getAllProductsQuery,
    getProducts: getProductsQuery,
    getProductById: getProductByIdQuery,
    getCountProducts: getCountProductsQuery,
    createNewProduct: createNewProductQuery,
    updateProduct: updateProductQuery,
    deleteProduct: deleteProductQuery,
    getTopProducts: getTopProductsQuery,
    getProductsByCategory: getProductsByCategoryQuery,
    getCountProductsByCategory: getCountProductsByCategoryQuery,
    addViewsProductById: addViewsProductByIdQuery
} = require('../database/queries');
const { logger } = require('../utils/logger');

class Product {
    constructor(name, image, price, category, description, isReady) {
        this.name = name;
        this.image = image;
        this.price = price;
        this.category = category;
        this.description = description;
        this.isReady = isReady;
    }

    static getAll(cb) {
        db.query(getAllProductsQuery, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
        });
    }

    static getProducts(limit, page, search, cb) {
        const offset = (page - 1) * limit;
        db.query(getProductsQuery, [search, limit, offset], (err, products) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            db.query(getCountProductsQuery, [search], (err, count) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }

                const totalItems = count[0].total;
                const totalPages = Math.ceil(totalItems / limit);

                cb(null, limit, page, products, totalItems, totalPages);
            });

        });
    }

    static getProductById(id, cb) {
        db.query(getProductByIdQuery, [id], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
        });
    }

    static addViewsById(id, cb) {
        db.query(addViewsProductByIdQuery, [id], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
        });
    }

    static getTopProducts(cb) {
        db.query(getTopProductsQuery, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            cb(null, res);
        });
    }

    static getProductsByCategory(category, limit, page, cb) {
        const offset = (page - 1) * limit;
        db.query(getProductsByCategoryQuery, [category, category, limit, offset], (err, products) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            db.query(getCountProductsByCategoryQuery, [category, category], (err, count) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }

                const totalItems = count[0].total;
                const totalPages = Math.ceil(totalItems / limit);

                cb(null, limit, page, products, totalItems, totalPages);
            });

        });
    }

    static create(newProduct, cb) {
        db.query(createNewProductQuery,
            [
                newProduct.name,
                newProduct.image,
                newProduct.price,
                newProduct.category,
                newProduct.description,
                newProduct.isReady,
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

    static update(newProduct, fields, id, cb) {
        const data = [
            newProduct.name,
            newProduct.image,
            newProduct.price,
            newProduct.category,
            newProduct.description,
            newProduct.isReady,
        ].filter((value) => value !== null && value !== undefined)
        data.push(id);

        db.query(updateProductQuery(fields),
            data, (err, res) => {
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
        db.query(deleteProductQuery,
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

module.exports = Product;