const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    // only email has to be defined, and other data we have already got in auth.js file
    // hash and salt will be automatically added by passport-local-mongoose
    email: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: 'buyer'
    },
    wishList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;