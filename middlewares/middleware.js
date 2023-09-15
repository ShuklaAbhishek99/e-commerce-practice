const {productSchema, reviewSchema} = require('../validation/schema');

module.exports.validateProduct = (req, res, next)=>{
    const {name, img, price, desc} = req.body;
    const {error} = productSchema.validate({name, img, price, desc});

    // console.log(error);
    if(error) {
        const msg = error.details.map((err)=> err.message).join(',');
        return res.render('error', {err: msg});
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const {rating, comment} = req.body;

    const {error} = reviewSchema.validate({rating, comment});

    // console.log(error);
    if(error) {
        const msg = error.details.map((err)=> err.message).join(',');
        return res.render('error', {err: msg});
    }
    next();
}