const mongoose = require('mongoose');
const Review = require('./review');

// creating a product Schema how the data will be stored
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    img: {
        type: String,
        trim: true,
        default: '../images/product.jpg'
    },
    price: {
        type: Number,
        min: 0,
        default: 0
    },
    desc: {
        type: String,
        trim: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    avgRating: {
        type: Number,
        default: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// this helps in deletion of the object
// use pre and post before mongoose.model
productSchema.post('findOneAndDelete', async (product)=>{
    // console.log(product);

    if(product.reviews.length > 0){
        await Review.deleteMany({_id: {$in: product.reviews}})
    }
})

// creating model from product Schema
const Product = mongoose.model('Product', productSchema);

// exporting the model
module.exports = Product;