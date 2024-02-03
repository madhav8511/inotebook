import React,{useContext, useEffect} from 'react'
import noteContext from '../context/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const {notes,getAllnote} = context;
    const {show_alert} = props;
    useEffect(()=>{
      if(localStorage.getItem('token')){
        getAllnote();
      }
      else{
        navigate('/login');
      }

    },[]);

  return (
    <>
      <AddNote show_alert={show_alert} />

      <div classNameName='row my-3'>
            <h1>Your Notes</h1>
            {notes.map((note)=>{
                return <NoteItem key={note._id} show_alert={show_alert} note={note}></NoteItem>
            })}
      </div>
    </>
    
  )
}
