import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    const host = "http://localhost:8080";
    const notesinitial = [];
    const [notes,setnotes] = useState(notesinitial);

    const getAllnote = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method:'GET',
            headers:{
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        setnotes(json);
        //props.show_alert("Welcome to i-Notebook","success");
    }
    //Add note..
    const addNote = async (title,description,tag)=>{

        const response = await fetch(`${host}/api/notes/addnote`,{
            method:'POST',
            headers:{
                'Content-Type':"application/json",
                'auth-token': localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });
        const json = await response.json();
        console.log(json);
        console.log("Adding a note");
        const note = {
            "title":title,
            "description":description,
            "tag":tag
        };
        setnotes(notes.concat(note));
    }
    //Delete note..
    const deleteNote = async (id)=>{
        
        console.log("Note deleted with id: "+id);
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':"application/json",
                'auth-token':localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        const newNotes = notes.filter((note)=>{return note._id !== id});
        setnotes(newNotes);
    }
    //Edit note...
    // const editNote = async (id,title,description,tag)=>{

    //     const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
    //         method:'POST',
    //         headers:{
    //             'Content-Type':"application/json",
    //             'auth-token': localStorage.getItem('token')
    //         },
    //         body:JSON.stringify({title,description,tag})
    //     });
    //     const json = await response.json();
    //     console.log(json);

    //     for(let index=0;index<notes.length;index++){
    //         const element = notes[index];
    //         if(element._id === id){
    //             element.title = title;
    //             element.description = description;
    //             element.tag = tag;
    //         }
    //     }
    // }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, getAllnote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;