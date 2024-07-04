const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Carlos')
})

app.get('/product', async(req, res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

app.get('/product/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/product/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const products = await Product.findByIdAndUpdate(id, req.body);
        if(!products){
            return res.status(404).json({message: 'Cannot find any product with ID ${id}'})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/product/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: 'Cannot find any product with ID ${id}'})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://admin:123456admin@carlosapi.yzoxmzv.mongodb.net/Node-API?retryWrites=true&w=majority&appName=CarlosAPI')
.then(() => {
    console.log('Connected to MongoDB')
    app.listen(3000, ()=> {
        console.log('Node API app is running on port 3000')
    })
}).catch(() => {
    console.log(error)
})