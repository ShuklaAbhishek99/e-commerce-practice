const mongoose = require('mongoose');
const Review = require('./review');
const Joi = require('joi');

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
    }
});

// this helps in deletion of the object
// use pre and post before mongoose.model
productSchema.post('findOneAndDelete', async (product)=>{
    // console.log(product);

    if(product.reviews.length > 0){
        await Review.deleteMany({id: {$in: product.reviews}})
    }
})

// creating model from product Schema
const Product = mongoose.model('Products', productSchema);

// exporting the model
module.exports = Product;