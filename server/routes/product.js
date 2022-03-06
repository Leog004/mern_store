const router = require("express").Router();
const {verifyTokenAndAdmin} = require('./verifyToken')
const Product = require("../models/Product");

// GET ALL PRODUCTS
router.get('/', async (req, res) => {

    const query = req.query.new;

    try {
        const prducts = query 
        ? await Product.find().sort({_id: 1}).limit(5)
        : Product.find();

        res.status(200).json(prducts);
    }

    catch(err) {
        res.status(500).json("Something has gone wrong");
    }
});


// CREATE A PRODUCT
router.post('/', verifyTokenAndAdmin, async (req, res) => {

    try {

        const newProduct = new Product(req.body);

        if(!newProduct) return res.status(500).json("Something went wrong");

        await newProduct.save();

        res.status(200).json(newProduct);

    } catch (err) {

        return res.status(500).json(err);
    }


})



module.exports = router;