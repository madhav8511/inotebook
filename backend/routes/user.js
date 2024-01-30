const express = require('express');
const userController = require('../controller/user');
const { body } = require("express-validator");

const router = express.Router();

router
    .get('/',userController.getAlluser)
    .post('/createUser',[body('email','Enter a valid Email id').isEmail(),body('name','Name length should be greater than 3').isLength({min:3}),body('password','Password length must be greater than 5').isLength({min:5})],userController.createUser);

exports.router = router;