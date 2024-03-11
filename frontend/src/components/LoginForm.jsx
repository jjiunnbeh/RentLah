import { useState } from "react";
import "../styles/LoginForm.css";

function LoginForm({user}) {

 
    return (
    
    <div>
      <form name={user} >
        <div className="row mb-3 .bg-primary">
          <label htmlFor="inputUserName3" className="col-sm-2 col-form-label ">
            Username
          </label>
          <div className="col-sm-10">
            <input
              type="username"
              className="form-control"
              id="inputUserName3"
              placeholder="Username"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword3" placeholder="Password" required/>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Sign in as {user}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
