const model = require('../model/notes');
const Notes = model.Notes;

exports.get = (req,res)=>{
    res.json({name: "Hello notes"});
}