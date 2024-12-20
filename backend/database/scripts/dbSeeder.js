const fs = require("fs");
const path = require("path");

const { logger } = require('../../utils/logger');
const { categoriesBulkInsert: bulkInsertCategoriesQuery, getAllCategories: getAllCategoriesQuery, productsBulkInsert: bulkInsertProductsQuery } = require('../queries');

const seedProductsData = (count, categories, descriptions) => {
    try {
        const uploadsDir = path.join(__dirname, "../../uploads");
        // Baca semua file di folder ./uploads
        const imageFiles = fs.readdirSync(uploadsDir);


        const imagesForSeed = imageFiles.length >= count
            ? imageFiles.slice(0, count)
            : Array.from({ length: count }, (_, i) =>
                imageFiles[i % imageFiles.length]
            );

        const dataToInsert = imagesForSeed.map((file, index) => ({
            name: `Produk ${index + 1}`,
            image: file,
            price: Math.floor(Math.random() * 100000) + 5000,
            category: categories[index % categories.length],
            description: descriptions[index % descriptions.length],
            isReady: Math.random() < 0.9 ? 1 : 0,
        }));

        const values = dataToInsert.map((item) => [
            item.name,
            item.image,
            item.price,
            item.category,
            item.description,
            item.isReady,
        ]);
        return [values];
    } catch (err) {
        console.error("Terjadi kesalahan:", err);
    }
};

const generateRandomCategoryName = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// Fungsi untuk membuat seeder kategori
const generateRandomString = (count) => {
    const categories = Array.from({ length: count }, () =>
        generateRandomCategoryName(10)
    );
    const values = categories.map((category) => [category]);
    return values;
};

(() => {
    const categories = generateRandomString(3);
    require('../../config/db.config').query(bulkInsertCategoriesQuery, [categories], (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Categories seeded!');
    });
    require('../../config/db.config').query(getAllCategoriesQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        const categories = _.map((category) => category.id);
        const descriptions = generateRandomString(10);
        logger.info(`categories: ${categories}`);

        const products = seedProductsData(100, categories, descriptions);
        require('../../config/db.config').query(bulkInsertProductsQuery, products, (err, _) => {
            if (err) {
                logger.error(err.message);
                return;
            }
            logger.info('Products seeded!');
            process.exit(0);
        });
    });
})();