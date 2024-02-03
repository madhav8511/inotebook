//Required file...
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/user');
const notesRouter = require('./routes/notes');
const cors = require('cors');

//Data base Connection...
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/NoteApp');
  console.log('Database Connected');
}

//Server connection...
const server = express();
server.use(cors());
server.use(express.json({  extended: true })); 
server.use(express.urlencoded({  extended: true }));
server.use(morgan('default'));
server.use(express.static('public'));



server.use('/api/user',userRouter.router);
server.use('/api/notes',notesRouter.router);

server.get('/',(req,res)=>{
    res.send("Hello World");
});

//Show on server...
server.listen(8080 ,()=>{
    console.log('Server Start');
});