import "../styles/Choice.css";
import { Link } from 'react-router-dom';


function LoginChoice()
{
    

    
    return (
        <div className="d-grid gap-2">
  <button onClick={()=>{console.log("Login as Customer")}}className="btn btn-primary" type="button">Login as Customer</button>
  <button onClick={()=>{console.log(" as Agent")}}className="btn btn-primary" type="button">Login as Agent</button>
  <a onClick={()=>{console.log("Register")}} href="/RegisterChoice">Register Here</a>
        </div>
    )
}
export default LoginChoice;