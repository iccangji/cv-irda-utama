const Category = require('../models/category.model');

exports.create = (req, res) => {
    const { name } = req.body;
    console.log(req.body);

    const category = new Category(name);
    Category.create(category, (err, data) => {
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
    const { name } = req.body;

    const category = new Category(name);

    Category.update(category, id, (err, data) => {
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

    Category.destroy(id, (err, data) => {
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
    Category.getAll((err, data) => {
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

