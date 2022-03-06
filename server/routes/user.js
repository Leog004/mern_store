const router = require("express").Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken')
const CryptoJS = require('crypto-js');
const User = require("../models/User");


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