const { DB_NAME } = require('../utils/secrets')

// DB QUERY
const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

// USERS QUERY
const createTableUsers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NULL,
    password VARCHAR(255) NOT NULL
)
`;

const createNewUser = `
INSERT INTO users VALUES(null, ?, ?)
`;

const findByUsername = `
SELECT * FROM users WHERE username = ?
`;

// PRODUCTS QUERY

const createTableProducts = `
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    category INT,
    description TEXT NOT NULL,
    views INT NOT NULL DEFAULT 0,
    isReady BOOLEAN NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category) REFERENCES categories(id) ON DELETE RESTRICT
)
`;

const getAllProducts = `
SELECT * FROM products ORDER BY createdAt DESC
`;

const getCountProducts = `
SELECT COUNT(*) as total FROM products WHERE name LIKE ?
`;

const getCountProductsByCategory = `
SELECT COUNT(*) as total FROM products WHERE category = ? or ? = ''
`;

const getProducts = `
SELECT products.*, categories.name AS category FROM products JOIN categories ON products.category = categories.id WHERE products.name LIKE ? ORDER BY createdAt DESC LIMIT ? OFFSET ?
`;

const getProductById = `
SELECT products.*, categories.name AS category FROM products JOIN categories ON products.category = categories.id WHERE products.id LIKE ?
`;

const addViewsProductById = `
UPDATE products SET views = views + 1 WHERE id = ?
`;

const getTopProducts = `
SELECT products.*, categories.name AS category FROM products JOIN categories ON products.category = categories.id ORDER BY products.views DESC, products.createdAt DESC LIMIT 10
`;

const getProductsByCategory = `
SELECT products.*, categories.name AS category FROM products JOIN categories ON products.category = categories.id WHERE products.category = ? OR ? = '' ORDER BY createdAt DESC LIMIT ? OFFSET ?
`;

const createNewProduct = `
INSERT INTO products (name, image, price, category, description, isReady) VALUES(?, ?, ?, ?, ?, ?)
`;
const updateProduct = (updateFields) => {
    const updates = Object.keys(updateFields)
        .map((field) => `${field} = ?`)
        .join(', ');
    return `UPDATE products SET ${updates} WHERE id = ?`;
}

const deleteProduct = `DELETE FROM products WHERE id = ?`;

// CATEGORIES QUERY

const createTableCategories = `
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
`;

const getAllCategories = `
SELECT 
    categories.name AS name, 
    categories.id AS id, 
    COUNT(products.id) AS count
FROM 
    categories
LEFT JOIN 
    products ON products.category = categories.id
GROUP BY 
    categories.id
ORDER BY 
    categories.updatedAt DESC`;

const createNewCategory = `
INSERT INTO categories (name) VALUES(?)
`;

const updateCategory = `UPDATE categories SET name = ? WHERE id = ?`;

const deleteCategory = `DELETE FROM categories WHERE id = ?`;

// SEEDER QUERY

const productsBulkInsert = `INSERT INTO products (name, image, price, category, description, isReady) VALUES ?`;

const categoriesBulkInsert = `INSERT INTO categories (name) VALUES ?`;

module.exports = {
    createDB,
    dropDB,
    createTableUsers,
    createNewUser,
    findByUsername,
    createTableProducts,
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct,
    createTableCategories,
    getAllCategories,
    createNewCategory,
    updateCategory,
    deleteCategory,
    getProducts,
    getCountProducts,
    productsBulkInsert,
    categoriesBulkInsert,
    getProductById,
    getTopProducts,
    getProductsByCategory,
    getCountProductsByCategory,
    addViewsProductById
};
