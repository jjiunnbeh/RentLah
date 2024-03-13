import "../styles/Choice.css";
import { Link } from 'react-router-dom';


function RegisterChoice()
{
    

    
    return (
    <div className="d-grid gap-5 ">
  <button onClick={()=>{console.log("Reg as Customer")}}className="btn btn-primary" type="button">Register as Customer</button>
  <button onClick={()=>{console.log("Reg as Agent")}}className="btn btn-primary" type="button">Register as Agent</button>
  <a className="Choice" onClick={()=>{console.log("LoginChoice")}} href="/">Have account? Login Here</a>
        </div>
    )
}
export default RegisterChoice;