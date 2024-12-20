const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkUsername = require('../middlewares/checkUsername');
const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');

const authController = require('../controllers/auth.controller');
const productsController = require('../controllers/products.controller');
const categoriesController = require('../controllers/categories.controller');

const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { upload } = require('../middlewares/imageUpload');

// PRODUCTS
router.route('/api/products')
    .get(asyncHandler(productsController.get));

router.route('/api/products/:id')
    .get(asyncHandler(productsController.getById));

router.route('/api/products')
    .post(isAuthenticated, upload.single("image"), asyncHandler(productsController.create));

router.route('/api/products/:id')
    .put(isAuthenticated, upload.single("image"), asyncHandler(productsController.update));

router.route('/api/products/:id')
    .delete(isAuthenticated, asyncHandler(productsController.destroy));

router.route('/api/top-products')
    .get(asyncHandler(productsController.getTopProducts));

router.route('/api/category-products')
    .get(asyncHandler(productsController.getProductsByCategory));

// CATEGORIES
router.route('/api/categories')
    .get(asyncHandler(categoriesController.get));

router.route('/api/categories')
    .post(isAuthenticated, asyncHandler(categoriesController.create));

router.route('/api/categories/:id')
    .put(isAuthenticated, asyncHandler(categoriesController.update));

router.route('/api/categories/:id')
    .delete(isAuthenticated, asyncHandler(categoriesController.destroy));

// AUTH
router.route('/api/signup')
    .post(signupValidator, asyncHandler(checkUsername), asyncHandler(authController.signup));

router.route('/api/login')
    .post(signinValidator, asyncHandler(authController.signin));

router.route('/api/logout')
    .post(asyncHandler(authController.signout));

router.route('/api/verify')
    .post(asyncHandler(authController.verify));

module.exports = router;