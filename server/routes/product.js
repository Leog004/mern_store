const router = require("express").Router();
const {verifyTokenAndAdmin} = require('./verifyToken')
const Product = require("../models/Product");

// GET ALL PRODUCTS
router.get('/', async (req, res) => {

    const query = req.query.new;
    const qCategory = req.query.category;

    try {

        let products;

        if(query){
            products = await Product.find().sort({createdAt: -1}).limit(5);
        }else if (qCategory){
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                }
            })
        }else{
            products = await Product.find();
        }
        
        res.status(200).json(products);

    }

    catch(err) {
        res.status(500).json("Something has gone wrong");
    }
});


// GET PRODUCT BY ID
router.get('/find/:id', async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json(product);
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



// UPDATE PRODUCT
router.post('/:id', verifyTokenAndAdmin, async (req, res) => {

    try {

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        }, {new: true});

        res.status(200).json(updatedProduct);

    } catch (err) {

        return res.status(500).json(err);
    }

})


// DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {

    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleeted");
    }

    catch(err) {
        res.status(500).json("Something has gone wrong");
    }
});




module.exports = router;