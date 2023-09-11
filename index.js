const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
// importing the routes for use
const productRoutes = require('./routes/products');
const ejsMate = require('ejs-mate');
var methodOverride = require('method-override');
const PORT = 5000;


// telling express that we will use the ejs as ejsMate
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce-app')
    .then(()=>{
        console.log("DB Connected!!");
    })
    .catch((e)=>{
        console.log(e)
    })


app.use(productRoutes)

app.get('/', (req, res)=>{
    res.send('Working Fine');
})

app.listen(PORT, ()=>{
    console.log('Server is up at port', PORT);
})