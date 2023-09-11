const mongoose = require('mongoose');
const Product = require('./models/product')

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce-app')
    .then(()=>{
        console.log("DB Connected!!");
    })
    .catch((e)=>{
        console.log(e)
    })


const dummy_products = [
    {
        name: 'Iphone 14',
        img: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aXBob25lJTIwMTR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        price: 200,
        desc: 'Apple iPhone 14 ; Internal, 128GB 6GB RAM, 256GB 6GB RAM, 512GB 6GB RAM ; Dual, 12 MP, f/1.5, 26mm (wide), 1/1.7", 1.9µm, dual pixel PDAF, sensor-shift OIS 12 MP, ...'
    },
    {
        name: 'Macbook Pro',
        img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price: 1000,
        desc: 'MacBook Pro. Our most powerful notebooks. Fast M1 processors, incredible graphics, and spectacular Retina displays. Now available in a 14-inch model.'
    },
    {
        name: 'Nike Shoes',
        img: 'https://plus.unsplash.com/premium_photo-1669644856868-6613f6683346?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmlrZSUyMHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        price: 150,
        desc: "The radiance lives on in the Nike Air Force 1 '07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.Colour Shown: White/White"
    },
    {
        name: 'OnePlus TWS',
        img: 'https://images.unsplash.com/photo-1655560378428-7605bda51749?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b25lcGx1cyUyMHR3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price: 85,
        desc: 'OnePlus Buds supports 30 hours of battery life, with environmental noise cancellation and powerful bass boost. Charging for 10 minutes to enjoy your ...'
    },
    {
        name: 'Polo T-shirt',
        img: 'https://images.unsplash.com/photo-1625910513399-c9fcba54338c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9sbyUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        price: 15,
        desc: 'this is black polo t-shirt'
    },
    {
        name: 'Camera',
        img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        price: 1000,
        desc: 'this is bsony camera dslr'
    }
];

async function seedDB(){
    await Product.deleteMany({});
    await Product.insertMany(dummy_products);
    console.log('DB Seeded');
}

seedDB();