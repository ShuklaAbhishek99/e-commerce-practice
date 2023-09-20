const { productSchema, reviewSchema } = require('../validation/schema');
const Product = require('../models/products');


module.exports.validateProduct = (req, res, next) => {
    const { name, img, price, desc } = req.body;
    const { error } = productSchema.validate({ name, img, price, desc });

    // console.log(error);
    if (error) {
        const msg = error.details.map((err) => err.message).join(',');
        return res.render('error', { err: msg });
    }
    next();
};

module.exports.validateReview = (req, res, next) => {
    const { rating, comment } = req.body;

    const { error } = reviewSchema.validate({ rating, comment });

    // console.log(error);
    if (error) {
        const msg = error.details.map((err) => err.message).join(',');
        return res.render('error', { err: msg });
    }
    next();
};

// login validation with passport
module.exports.isLoggedin = (req, res, next) => {
    // xhr = xml http request
    // if xhr returns true then it is xml http request and if it returns false then it is AJAX request
    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).json({
            msg:'Please Login first'
        })
    }

    if (!req.isAuthenticated()) {
        req.flash('reject', 'Please Log in first!!');
        return res.redirect('/login');
    }
    
    next();
};

// checking if the user is seller or not
module.exports.isSeller = (req, res, next) => {
    if (req.user.role === 'buyer') {
        req.flash('reject', 'You are not authorized to do that');
        return res.redirect('back');
    }

    next();
};


// we will be using it inside the routes where we are receiving the req.params so id will be accesible
module.exports.isProductAuthor = async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product.author || !product.author.equals(req.user._id)) {
        req.flash('reject', 'You are not authorized to do that!');
        return res.redirect('back');
    }

    next();
};