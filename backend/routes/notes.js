const express = require('express');
const notesController = require('../controller/notes');
const decode = require('../middleware/login');
const fetchuser = decode.fetchUser;
const router = express.Router();
const { body } = require("express-validator");

router
    .get('/fetchallnotes',fetchuser,notesController.getAllnotes)
    .post('/addnote',fetchuser,[body('title','Enter a valid title').isLength({min:3}),body('description','Description length should be greater than 5').isLength({min:5})],notesController.addnotes)
    .put('/updatenote/:id',fetchuser,notesController.updatenote)
    .delete('/deletenote/:id',fetchuser,notesController.deletenote);

exports.router = router;