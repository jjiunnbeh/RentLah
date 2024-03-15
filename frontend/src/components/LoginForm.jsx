import { useState } from "react";
import "../styles/LoginForm.css";
import Axios from "axios";
import {loginService} from "../service/LoginService";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { Link } from "react-router-dom";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import loginimg from '../assets/loginimg.png';

function LoginForm({ user }) 
{
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated()



  const [hide, setHide] = useState(true);
  const [data, setData] = useState({
    username: "",
    password: "",
    user
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

  const handleSubmit = async (event) => 
  {
    event.preventDefault();
    try {
      const response = await loginService(data);
      // Handle successful login based on the server's response 
      console.log(response.message);
      if (!response.token)
      {
        setErrorMessage(response.message);
      }
      else
      {
        setErrorMessage('');
        if (signIn({
          auth: {
            token: response.token,
            type: 'Bearer'
          },
          userState: response.userType
        })) {
          // Successful login using react-auth-kit
          if (isAuthenticated)
          {
            window.location.href = '/';

          }



        }


      }
      console.log(response.token);



      
      console.log(response);
    } catch (error) {
      // Handle login errors 
      
    }
  };

  return (
    <div className="formcontainer">
      <form name={user} onSubmit={handleSubmit}>
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
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-8 col-form-label">
            Password
          </label>
          <div className="col-sm-8">
            <input
              type={hide ? "password" : "text"}
              className="form-control"
              id="inputPassword3"
              placeholder="Password"
              onChange={handleChange}
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
              <div>
              {errorMessage && <span id="errormsg">{errorMessage}</span>} 
              <button className="btn btn-danger" onClick={handleClickHide} id="monkey-emoji" >
            {hide ? "🙈" : "🙊"}
          </button>

              </div>
            </div>
            <div>
            <button className= "btn btn-link =">Forget Password</button>
            </div>
           
           

        </div>
        <button type="submit" className="btn btn-primary loginSubmit" >
          Login as {user}
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
