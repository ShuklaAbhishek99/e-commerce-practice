const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const Review = require('../models/review');
const {validateProduct, isLoggedin, isSeller, isProductAuthor} = require('../middlewares/middleware');


// Show products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});

        // res.send(products);
        res.render('products/index', { products });
    } catch (error) {
        res.render('error', { err: error.message })
    }
});

// New file request, new page form to add an item
router.get('/products/new', isLoggedin, isSeller, (req, res) => {
    try {
        res.render('products/new');
    } catch (error) {
        res.render('error', {err: error.message})
    }
});

// sending data to server for product addition
router.post('/products', isLoggedin, isSeller, validateProduct, async (req, res) => {
    try {
        // console.log(req.body);
        // const {name, price, desc, imagge} = req.body;
        // below code is similar to above
        await Product.create({...req.body, author:req.user._id});

        req.flash('success', 'Added Your Product Successfully!!');

        res.redirect('/products');
    } catch (error) {
        res.render('error', {err: error.message})
    }
});

// product show request
router.get('/products/:id', async (req, res) => {
    try {
        // Population is the process of replacing the specified path in the document of one collection,
        // with the actual document from the other collection
        // Need of Population: Whenever in the schema of one collection we provide a reference (in any field)
        // to a document from any other collection, we need a populate() method to fill the field with that document.
        const { id } = req.params;
        const product = await Product.findById(id).populate('reviews');
        res.render('products/show', { product });
    } catch (error) {
        res.render('error', {err: error.message})
    }
});

// product edit page
router.get('/products/:id/edit', isLoggedin, isSeller, isProductAuthor, async (req, res) => {
    try {
        // res.send('Edit Page');
        const { id } = req.params;
        const product = await Product.findById(id);
    
        res.render('products/edit-update', { product });
    } catch (error) {
        res.render('error', {err: error.message})
    }
});

// product update method
router.patch('/products/:id', isLoggedin, isSeller, validateProduct, isProductAuthor, async (req, res) => {
    try {
        const { id } = req.params;

        await Product.findByIdAndUpdate(id, req.body);

        req.flash('success', 'Edited Your Product Successfully!!');

        res.redirect(`/products/${id}`);
    } catch (error) {
        res.render('error', {err: error.message})
    }
});

// product delete message
router.delete('/products/:id', isLoggedin, isSeller, isProductAuthor, async (req, res) => {
    try {
        const { id } = req.params;
    
        // When deleting the products, the reviews are delted from DB for that, below code is used
        const productTodelete = await Product.findById(id);
        // for(let reviewId of productTodelete.reviews){
        //     await Review.findByIdAndDelete(reviewId);
        // }
    
        // deleting the product
        await Product.findByIdAndDelete(id);
        
        req.flash('success', 'Deleted Your Product Successfully!!');

        
        res.redirect('/products');
    } catch (error) {
        res.render('error', {err: error.message})
    }
});

module.exports = router;