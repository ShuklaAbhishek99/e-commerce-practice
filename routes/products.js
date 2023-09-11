const express = require('express');
const Product = require('../models/products');
const router = express.Router();


router.get('/products', async(req, res)=>{
    const products = await Product.find({});

    // res.send(products);
    res.render('products/index', {products});
});

// New file request
router.get('/products/new', (req, res)=>{
    res.render('products/new');
});

// sending data to server for product addition
router.post('/products', async(req, res)=>{
    console.log(req.body);
    await Product.create(req.body);
    res.redirect('/products');
});

// product show request
router.get('/products/:id', async(req, res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/show', {product});
});


module.exports = router;