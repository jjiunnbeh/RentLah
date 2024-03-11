import "../styles/Choice.css";



function RegisterChoice()
{
    

    
    return (
        <div className="d-grid gap-2">
  <button onClick={()=>{console.log("Login as Customer")}}className="btn btn-primary" type="button">Register as Customer</button>
  <button onClick={()=>{console.log(" as Agent")}}className="btn btn-primary" type="button">Register as Agent</button>
  <a onClick={()=>{console.log("LoginChoice")}} href="/">Have account? Login Here</a>
        </div>
    )
}
export default RegisterChoice;