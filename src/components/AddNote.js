import React, { useState,useContext } from 'react'
import noteContext from '../context/NoteContext';

export default function (props) {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note,setNote] = useState({title:"",description:"",tag:"default"});

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        props.show_alert("Note added successfully","success");
    }

    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
  return (
    <div className='container'>
        <h1>Add a Note</h1>
      <form className='container my-3'>
        <div className="mb-3">
          <label htmlFor="title">Title</label>
          <input type="text"   className="form-control" id="title" name='title' placeholder="Enter title" autocomplete="off" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" id="description" name='description' placeholder="Give description" autocomplete="off" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag">Tag</label>
          <input type="text" className="form-control" id="Tag" name='tag'autocomplete="off" placeholder="Give Tag" onChange={onChange}/>
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add a Note</button>
      </form>
    </div>
  )
}
