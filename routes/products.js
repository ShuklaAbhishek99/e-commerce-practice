const express = require('express');
const router = express.Router();
const {validateProduct, isLoggedin, isSeller, isProductAuthor} = require('../middlewares/middleware');
const { showAllProducts, productForm, createProduct, showProduct, productEditForm, productUpdateForm, deleteProduct } = require('../controllers/products');

router.route('/')
    .get(showAllProducts)
    .post(isLoggedin, isSeller, validateProduct, createProduct)

router.get('/new', isLoggedin, isSeller, productForm);

router.route('/:id')
    .get(showProduct)
    .patch(isLoggedin, isSeller, validateProduct, isProductAuthor, productUpdateForm)
    .delete(isLoggedin, isSeller, isProductAuthor, deleteProduct)

router.get('/:id/edit', isLoggedin, isSeller, isProductAuthor, productEditForm);

module.exports = router;