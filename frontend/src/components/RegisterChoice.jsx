import "../styles/Choice.css";
import { Link } from 'react-router-dom';


function RegisterChoice()
{
    function handleClick(event)
    {
        window.location.href= "/register=" + event.target.name;
    }

    
    return (
    <div className="d-grid gap-5 ">
  <button onClick={handleClick} name="Customer" className="btn btn-primary" type="button">Register as Customer</button>
  <button onClick={handleClick} name="Agent" className="btn btn-primary" type="button">Register as Agent</button>
  <a className="Choice" href="/LoginChoice">Have account? Login Here</a>
    </div>
    )
}

export default RegisterChoice;