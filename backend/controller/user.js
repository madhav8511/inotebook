const { validationResult } = require("express-validator");
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