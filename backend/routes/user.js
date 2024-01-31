const express = require('express');
const userController = require('../controller/user');
const decode = require('../middleware/login');
const fetchUser = decode.fetchUser;
const { body } = require("express-validator");

const router = express.Router();

router
    .get('/',userController.getAlluser)
    .post('/createUser',[body('email','Enter a valid Email id').isEmail(),body('name','Name length should be greater than 3').isLength({min:3}),body('password','Password length must be greater than 5').isLength({min:5})],userController.createUser)
    .post('/login',[body('email','Enter a valid Email id').isEmail(),body('password','Password can not be blank').exists()],userController.loginUser)
    .post('/getUser', fetchUser ,userController.userbyId);

exports.router = router;