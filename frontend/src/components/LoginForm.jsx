import { useState } from "react";
import "../styles/LoginForm.css";

function LoginForm({user}) {
    const [hide, setHide] = useState(true);

    function handleClickHide(event)
    {
        event.preventDefault();
        setHide(!hide);
    }


 
    return (
    
    <div className="form">
      <form name={user} >
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
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input type={hide ? "password" :"text"} className="form-control" id="inputPassword3" placeholder="Password" required />
            <button className="btn" onClick={handleClickHide} id="monkey-emoji">{hide? "🙈" : "🙊"}</button>
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
