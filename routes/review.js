const express = require('express');
const Review= require('../models/review');
const Product = require('../models/products');
const router = express.Router();

router.post('/products/:productId/review', async (req, res)=>{
    // console.log(req.body);

    const {productId} = req.params;
    const newReview = new Review(req.body);
    await newReview.save();

    const product = await Product.findById(productId);
    // console.log(req.body)
    const newAvgRating = ((product.avgRating * product.reviews.length) + parseInt(req.body.rating)) / (product.reviews.length + 1);
    product.avgRating = parseFloat(newAvgRating.toFixed(1));
    
    product.reviews.push(newReview);

    await product.save();
    await newReview.save();

    // back will send you on previous page 
    res.redirect('back');
})

module.exports = router;