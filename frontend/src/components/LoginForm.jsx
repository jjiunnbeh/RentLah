import { useState } from "react";
import "../styles/LoginForm.css";
import Axios from "axios";
import {loginService} from "../service/LoginService"


function LoginForm({ user }) {
  const [hide, setHide] = useState(true);
  const [data, setData] = useState({
    username: "",
    password: "",
    user
  });

  function handleClickHide(event) {
    event.preventDefault();
    setHide(!hide);
  }
  function handleChange(event) {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginService(data);
      // Handle successful login based on the server's response (e.g., redirect, display success message)
      console.log(response.data);
    } catch (error) {
      // Handle login errors (e.g., display error message)
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="form">
      <form name={user} onSubmit={handleSubmit}>
        <div className="row mb-3 .bg-primary">
          <label htmlFor="inputUserName3" className="col-sm-2 col-form-label ">
            Username
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputUserName3"
              placeholder="Username"
              required
              onChange={handleChange}
              name="username"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type={hide ? "password" : "text"}
              className="form-control"
              id="inputPassword3"
              placeholder="Password"
              required
              onChange={handleChange}
              name="password"
            />
            <button className="btn" onClick={handleClickHide} id="monkey-emoji" onKeyDown={(event)=>{return false}}>
              {hide ? "🙈" : "🙊"}
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Login as {user}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
