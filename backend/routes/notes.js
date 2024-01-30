const express = require('express');
const notesController = require('../controller/notes');

const router = express.Router();

router.get('/',notesController.get);

exports.router = router;