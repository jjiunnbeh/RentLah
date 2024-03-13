import { useState } from "react";
import "../styles/LoginForm.css";
import Axios from "axios";
import {loginService} from "../service/LoginService"


function LoginForm({ user }) 
{
  const [hide, setHide] = useState(true);
  const [data, setData] = useState({
    username: "",
    password: "",
    user
});

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
      console.log(response);
    } catch (error) {
      // Handle login errors 
      console.error("Login failed:", error);
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
              required
              

            />
            </div>
            <div>
            <a className="fgetPass" href="" >Forget Password</a>
            </div>
            <div>
            <button className="btn" onClick={handleClickHide} id="monkey-emoji" >
              {hide ? "🙈" : "🙊"}
            </button>
          </div>

        </div>
        <button type="submit" className="btn btn-primary" >
          Login as {user}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
