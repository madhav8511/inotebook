const model = require('../model/notes');
const { validationResult } = require("express-validator");
const Notes = model.Notes;

exports.getAllnotes = async (req,res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }

}

exports.addnotes = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({error: errors.array() });
    }
    try {
        const {title,description,tag} = req.body;
        const note = new Notes({
            title,description,tag,user:req.user.id
        })
        await note.save();
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }   
}

exports.updatenote = async (req,res)=>{
    const {title,description,tag} = req.body;

    const newnote = {};
    if(title){newnote.title = title};
    if(description){newnote.description = description};
    if(tag){newnote.tag = tag};

    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not found");
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set: newnote},{new:true});
    res.json({note});
}

exports.deletenote = async (req,res)=>{
    try {
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"success":"Note has been deleted"});
    }
     catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
}