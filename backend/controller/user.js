const { validationResult } = require("express-validator");
require('dotenv').config()
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const model = require('../model/user');
const User = model.User;

exports.getAlluser = async (req,res)=>{
    const user = await User.find();
    res.json(user);
}

exports.createUser = async (req,res)=>{
    //Error checking that mention in router position...
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({error: errors.array() });
    }
    //Basic try catche block...
    try{
        let user = await User.findOne({email : req.body.email});
        if(user){
            return res.status(400).json({error : "Sorry a user exist with same email id"});
        }

        //Password Hashing...
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);

        user = new User();
        user.name = req.body.name;
        user.password = secPass;
        user.email = req.body.email;
        await user.save();

        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data,process.env.JWT_SECRET);
        res.json({authtoken});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}

exports.loginUser = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({error: errors.array() });
    }

    // const [email,password] = req.body;
    const email = req.body.email;
    const password = req.body.password;
    try {
        let user = await User.findOne({email});
        if(!user){
            res.status(400).json({error:"Please try to login using correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            res.status(400).json({error:"Please try to login using correct credentials"});
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data,process.env.JWT_SECRET);
        res.json({authtoken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
}

exports.userbyId = async (req,res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
}

