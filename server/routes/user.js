const router = require("express").Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken')
const CryptoJS = require('crypto-js');
const User = require("../models/User");
const { response } = require("express");

// GET ALL USERS
router.get('/', verifyTokenAndAdmin, async (req, res) => {

    const query = req.query.new;

    try {
        const user = query 
        ? await User.find().sort({_id: 1}).limit(5)
        : User.find();

        res.status(200).json(user);
    }

    catch(err) {
        res.status(500).json("Something has gone wrong");
    }
});


// GET USER STATS, user updates by date
router.get('/', verifyTokenAndAdmin, async (req, res) => {

    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {

        const data = await User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: lastYear
                    }
                },
            },

            {
                $project: {
                    month: {$month: "$createdAt"}
                }
            },

            {
                $group: {
                    _id: "$month", 
                    total: {$sum: 1}
                }
            }

        ]);

        response.status(200).json(data);

    }

    catch(err) {
        res.status(500).json("Something has gone wrong");
    }
});

// GET USER
router.get('/:id', verifyTokenAndAdmin, async (req, res) => {

    try {
        const user = await User.findById(req.params.id);

        const {password, ...others} = user._doc;

        res.status(200).json(others);
    }

    catch(err) {
        res.status(500).json("Something has gone wrong");
    }
});


// UPDATE
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {

    if(req.body.password){
        req.body.password =  CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString()
    }

    try {

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});

        res.status(200).json(updatedUser);

    }catch(err){
        return res.status(500).json(err);
    }

})


// DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleeted");
    }

    catch(err) {
        res.status(500).json("Something has gone wrong");
    }
});

module.exports = router;