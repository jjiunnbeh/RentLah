import "../styles/Choice.css";
import { Link } from 'react-router-dom';



function LoginChoice()
{
    function handleClick(event)
    {
        window.location.href= "/login=" + event.target.name;
    }

    
    return (
        <div className="d-grid gap-5">
  <button onClick={handleClick} name="Customer" className="btn btn-primary" type="button">Login as Customer</button>
  <button onClick={handleClick} name="Agent" className="btn btn-primary" type="button">Login as Agent</button>
  <a className="Choice" onClick={()=>{console.log("Register")}} href="/RegisterChoice">Register Here</a>
        </div>
    )
}
export default LoginChoice;