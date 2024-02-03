import './App.css';
import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SipLog from './components/SipLog';


function App() {
  const [alert,setAlert] = useState(null);
  const show_alert = (message,type)=>{
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(()=>{
      setAlert(null);
    },1500);
  };

  return (
    <>
    <NoteState show_alert={show_alert}>
      <Router>
          <Navbar/>
          <Alert alert = {alert}/>
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home show_alert={show_alert}/>}></Route>
              <Route path='/about' element={<About/>}></Route>
              <Route path='/login' element={<Login show_alert={show_alert}/>}></Route>
              <Route path='/signup' element={<SipLog show_alert={show_alert}/>}></Route>
            </Routes>
          </div>
        </Router>
    </NoteState>
    </>
  );
}

export default App;
