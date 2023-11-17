import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({setFullName}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const navigate = useNavigate();

  const emailError = !email ? "Email is required" : 
  !email.includes("@") ? "Email must contain @" : "";

  const passwordError = !password ? "Password is required" :
  password.length < 8 ? "Password must be at least 8 characters" : "";

  
  function onSubmitLogin(evt) {
    setError("");
    evt.preventDefault();
    if(emailError) {
      setError(emailError);
      return;
    } else if(passwordError) {
      setError(passwordError);
      return;
    }
    axios.post("http://localhost:3003/api/users/login", {email,password}, {withCredentials: true}).then(response => {
      console.log(response.data.fullName);
      localStorage.setItem("fullName", response.data.fullName);
      setFullName(response.data.fullName);
      navigate("/");
    }).catch(error => {

      const resError = error?.response?.data;

      if(resError){
        //Bad Username or Password
        console.log(resError);
      
        if(typeof resError === "string"){
          setError(`string ${resError}`);
        }else if(resError.error){ //Joi Validation Error
          setError(`array ${resError.error[0]}`);
        }
      }
    });
  }

  return (
    <>
      <div className="row mt-4">
        <div className="col-4"></div>
        <div className="col-4">
          <form>
            <div className="mb-3">
              <label htmlFor="txtEmail" className="form-label">Email address</label>
              <input type="email" className="form-control" id="txtEmail" aria-describedby="emailHelp" onChange={(evt) => setEmail(evt.target.value)}/>
              <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="txtPassword" className="form-label">Password</label>
              <input type="password" className="form-control" id="txtPassword" onChange={(evt) => setPassword(evt.target.value)}/>
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
              <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
            </div>
            <button type="submit" className="btn btn-primary" onClick={(evt) => onSubmitLogin(evt)}>Submit</button>
          </form>
        </div>
        <div className="col-4">
          {error &&
          <div className='alert alert-danger' role='alert'>
          {error}
          </div>
          }
          
      </div>
    </div>
    </>
    
  );
}
