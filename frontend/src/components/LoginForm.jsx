import { useState } from "react";
import "../styles/LoginForm.css";
import Axios from "axios";
import {loginService} from "../service/LoginService";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { Link } from "react-router-dom";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import loginimg from '../assets/loginimg.png';

function LoginForm({ userType }) 
{
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated()



  const [hide, setHide] = useState(true);
  const [data, setData] = useState({
    username: "",
    password: "",
    userType
});
const [errorMessage,setErrorMessage] = useState("");

  function handleClickHide(event) 
  {
    event.preventDefault();
    setHide(!hide);
  }

  function handleChange(event) 
  {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(data.username, data.password);
      const response = await loginService(data);
  
      if (!response.token) {
        setErrorMessage(response.message);
        // Don't need to set state here
        // Just update state directly
        setData({
          ...data,
          password: ""
        });
      } else {
        setErrorMessage('');
        if (signIn({
          auth: {
            token: response.token,
            type: 'Bearer'
          },
          userState: response.username
        })) {
          if (isAuthenticated) {
            window.location.href = '/';
          }
        }
      }
      console.log(response.token);
      console.log(response);
    } catch (error) {
      // Handle login errors 
      console.error("Login error:", error);
    }
  };

  return (
    <div className="formcontainer">
      <form name={userType} onSubmit={handleSubmit}>
        <div className="row mb-4 .bg-primary">
          <label htmlFor="inputUserName3" className="col-sm-8 col-form-label ">
            Username
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="inputUserName3"
              placeholder="Username"
              onChange={handleChange}
              name="username"
              onKeyDown= {(event)=> (event.key === "Enter" || event.key ===" ") && event.preventDefault()}
              value={data.username}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-8 col-form-label">
            Password
          </label>
          <div className="col-sm-8">
          <div className="input-group">
            <input
              type={hide ? "password" : "text"}
              className="form-control"
              id="inputPassword3"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
              name="password"
              onKeyDown= {
                (event)=>
                {
                  if ((event.key) === "Enter")
                  {
                    event.preventDefault();
                    {(data.username != "" && data.password != "") ? (handleSubmit(event)) : alert("Username and Password field cannot be empty!")}
                  }
                  else if (event.key === ' ')
                  {
                    event.preventDefault();
                  }
                }
              }
              required/>
              <button className="btn" onClick={handleClickHide} id="monkey-emoji" style={{backgroundColor: "white", marginBottom:"20px"}}>
              {hide ? "🙈" : "🙊"}
              </button>
              </div>
              <div>
              {errorMessage && <span id="errormsg">{errorMessage}</span>} 
              </div>
            </div>
            <div>
            <button className= "btn btn-link =" style={{color: "white"}}>Forget Password</button>
            </div>
           
           

        </div>
        <button type="submit" className="btn btn-primary loginSubmit" >
          Login as {userType}
        </button>
      </form>
      <div className="imagecontainer">
      <img
        src={loginimg}
        alt="City landscape"
        style={{ height: "100%", left: "0%" }}
      />
    </div>
    </div>
  );
}

export default LoginForm;
