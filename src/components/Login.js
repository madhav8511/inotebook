import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'


export default function Login(props) {
    const navigate = useNavigate();
    const [credentials,setCredentails] = useState({email: "",password: ""});

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/user/login",{
            method:'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({email: credentials.email,password: credentials.password}) //Data which is shared through body...
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //re-direct to 
            localStorage.setItem('token',json.authtoken);
            props.show_alert("Login Successfully","success");
            navigate('/');
        }
        else{
            props.show_alert("Invalid Credentials","error");
        }
    }

    const onChange = (e)=>{
        setCredentails({...credentials,[e.target.name]: e.target.value});
    }

  return (
    <div>
        <form  onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" value={credentials.email} className="form-control" name='email' id="email" onChange={onChange} autocomplete="off" aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password"  value={credentials.password}  className="form-control" name='password' onChange={onChange}  id="password" placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
