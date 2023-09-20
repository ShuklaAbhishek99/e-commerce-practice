const Product = require("../models/products");

// Show products
module.exports.showAllProducts = async (req, res) => {
    try {
        // res.send(products);
        const products = await Product.find({});
        res.render('products/index', { products });
    } catch (e) {
        res.render('reject', { err: e.message });
    }
}

// New file request, new page form to add an item
module.exports.productForm = (req, res) => {
    try {
        res.render('products/new');
    }
    catch (e) {
        res.render('reject', { err: e.message });
    }
}

// sending data to server for product addition
module.exports.createProduct = async (req, res) => {
    try {
        // console.log(req.body);
        // const {name, price, desc, imagge} = req.body;
        // below code is similar to above
        await Product.create({ ...req.body, author: req.user._id });

        req.flash('success', 'Product added successfully!!');
        res.redirect('/products');
    }
    catch (e) {
        res.render('reject', { err: e.message });
    }
}

// product show request
module.exports.showProduct = async (req, res) => {
    try {
        // Population is the process of replacing the specified path in the document of one collection,
        // with the actual document from the other collection
        // Need of Population: Whenever in the schema of one collection we provide a reference (in any field)
        // to a document from any other collection, we need a populate() method to fill the field with that document.
        const { id } = req.params;
        const product = await Product.findById(id).populate('reviews');
        res.render('products/show', { product });
    }
    catch (e) {
        res.render('reject', { err: e.message });
    }
}

// product edit page
module.exports.productEditForm = async (req, res) => {
    try {
        // res.send('Edit Page');
        const { id } = req.params;
        const product = await Product.findById(id);

        res.render('products/edit-update', { product });
    }
    catch (e) {
        res.render('reject', { err: e.message });
    }
}

// product update method
module.exports.productUpdateForm = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndUpdate(id, req.body);

        req.flash('success', 'Saved your product successfully!');
        res.redirect(`/products/${id}`);
    }
    catch (e) {
        res.render('reject', { err: e.message });
    }
}

// product delete message
module.exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // When deleting the products, the reviews are delted from DB for that, below code is used
        // for(let reviewId of productTodelete.reviews){
        //     await Review.findByIdAndDelete(reviewId);
        // }
    
        // deleting the product
        await Product.findByIdAndDelete(id);

        req.flash('success', 'Deleted your product successfully!');
        res.redirect(`/products`);
    }
    catch (e) {
        res.render('reject', { err: e.message });
    }
}