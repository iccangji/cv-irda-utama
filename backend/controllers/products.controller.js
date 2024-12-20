const Product = require('../models/product.model');

exports.create = (req, res) => {
    const { name, price, category, description, isReady } = req.body;
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    const fileName = req.file.filename;

    const product = new Product(
        name, fileName, price, category, description, isReady ? 1 : 0
    );
    Product.create(product, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(201).send({
                status: "success",
                data
            });
        }
    })
}

exports.update = (req, res) => {
    const { id } = req.params;
    const { name, price, category, description, isReady } = req.body;
    const image = req.file ? req.file.filename : null;

    let fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name;
    if (image) fieldsToUpdate.image = image;
    if (price) fieldsToUpdate.price = price;
    if (category) fieldsToUpdate.category = category;
    if (description) fieldsToUpdate.description = description;
    if (isReady) fieldsToUpdate.isReady = isReady;

    if (Object.keys(fieldsToUpdate).length === 0) {
        console.log(fieldsToUpdate);
        return res.status(400).json({
            message: 'Tidak ada data yang diubah. Isi minimal satu field.',
        });
    }

    const product = new Product(
        (name) ? name : null,
        (image) ? image : null,
        (price) ? price : null,
        (category) ? category : null,
        (description) ? description : null,
        (isReady === 'true') ? 1 : 0
    );

    Product.update(product, fieldsToUpdate, id, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(200).send({
                status: "success",
                data
            });
        }
    })
}

exports.destroy = (req, res) => {
    const { id } = req.params;

    Product.destroy(id, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(200).send({
                status: "success",
                data
            });
        }
    })
}

exports.get = (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 50;
    const search = req.query.search || '';

    Product.getProducts(limit, page, `%${search}%`, (err, limit, page, data, totalItems, totalPages) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(200).send({
                status: "success",
                limit,
                page,
                totalItems,
                totalPages,
                data
            });
        }
    })
}

exports.getById = (req, res) => {
    const id = req.params.id;

    Product.getProductById(id, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
            return;
        } else {

            Product.addViewsById(id, (err, _) => {
                if (err) {
                    res.status(500).send({
                        status: "error",
                        message: err.message
                    });
                    return;

                } else {
                    res.status(200).send({
                        status: "success",
                        data
                    });
                }
            })
        }
    })
}

exports.getTopProducts = (req, res) => {
    Product.getTopProducts((err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(200).send({
                status: "success",
                data
            });
        }
    })
}

exports.getProductsByCategory = (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;
    const category = req.query.category ? req.query.category : '';
    Product.getProductsByCategory(category, limit, page, (err, limit, page, data, totalItems, totalPages) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            res.status(200).send({
                status: "success",
                limit,
                page,
                totalItems,
                totalPages,
                data
            });
        }
    })
}

