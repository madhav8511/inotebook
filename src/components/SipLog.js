import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom'

export default function SipLog(props) {
  const navigate = useNavigate();
  const [credentials,setCredentails] = useState({name:"",email: "",password: "",cpassword:""});

  const handleSubmit = async (e)=>{
      e.preventDefault();
      const {name,email,password,cpassword} = credentials;
      if(password === cpassword){
          const response = await fetch("http://localhost:8080/api/user/createUser",{
            method:'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({name,email,password}) //Data which is shared through body...
        });
        const json = await response.json();
        if(json.success){
            //re-direct to 
            localStorage.setItem('token',json.authtoken);
            navigate('/');
            props.show_alert("Account Created successfully","success");
        }
        else{
            props.show_alert("Invalid Credentials","error");
        }
      }
      else{
        props.show_alert("Password must be same as Confirm password","error");
      }
      
  }

  const onChange = (e)=>{
      setCredentails({...credentials,[e.target.name]: e.target.value});
  }
  return (
    <div className='container'>
       <form onSubmit={handleSubmit}>
       <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="name" value={credentials.name} className="form-control" name='name'  id="name" placeholder="Name" autocomplete="off" onChange={onChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" value={credentials.email} className="form-control" name='email' id="email"  aria-describedby="emailHelp" autocomplete="off" placeholder="Enter email" onChange={onChange}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" value={credentials.password} className="form-control" name='password' id="password" placeholder="Password" onChange={onChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="cpassword">Confirm Password</label>
            <input type="password" value={credentials.cpassword} className="form-control" name='cpassword' id="cpassword" placeholder="Password" onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}


