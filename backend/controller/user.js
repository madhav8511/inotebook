const { validationResult } = require("express-validator");
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
        user = new User(req.body);
        await user.save();
        res.json({success: "User added !Welcome!"});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}