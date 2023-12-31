const express = require('express');
const Review = require('../models/review');
const Product = require('../models/products');
const router = express.Router();
const { validateReview, isLoggedin } = require('../middlewares/middleware')

router.post('/products/:productId/review', isLoggedin, validateReview, async (req, res) => {
    // console.log(req.body);
    try {
        const { productId } = req.params;
        const newReview = new Review(req.body);
        await newReview.save();

        const product = await Product.findById(productId);
        // console.log(req.body)
        const newAvgRating = ((product.avgRating * product.reviews.length) + parseInt(req.body.rating)) / (product.reviews.length + 1);
        product.avgRating = parseFloat(newAvgRating.toFixed(1));

        product.reviews.push(newReview);

        await product.save();
        await newReview.save();

        // from connect flash
        req.flash('success', 'Added Your review successfully!!');

        // back will send you on previous page 
        res.redirect('back');
    } catch (error) {
        res.redirect('back');
    }

});

module.exports = router;