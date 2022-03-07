const router = require("express").Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {

    const {username, email, password} = req.body;

    if(!username || !email || !password) return  res.status(500).json("No data was entered");

    const newUser = new User({
        username,
        email,
        password: CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET).toString()
    });

    try{

        const saveUser = await newUser.save();

        return res.status(201).json(saveUser);

    }catch(error){

        if(error.message.includes("E11000")) 
            return  res.status(500).json({"error" : "username or email is already created."});

        return res.status(500).json(error.message);
    }

})


// LOGIN
router.post('/login', async (req, res) => {


    try{
        const {username, password} = req.body;

        const user = await User.findOne({username});

        if (!user) return res.status(401).json({"error" : "Wrong credentials"});

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET
        );

        const checkPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(password !== checkPassword)
             return res.status(401).json({"error" : "Wrong credentials"});

        
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET, {expiresIn: "3d"});

        const { password: userPassword, ...others} = user._doc;     

        return res.status(200).json({...others, accessToken});


    }catch(err){
        return res.status(500).json(err);
    }
});


module.exports = router;