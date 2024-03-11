import "../styles/LandingForm.css";
function LandingForm()
{
    return (
        <div className="d-grid gap-2">
  <button onClick={()=>{console.log("Login as Customer")}}className="btn btn-primary" type="button">Login as Customer</button>
  <button onClick={()=>{console.log("Login as Agent")}}className="btn btn-primary" type="button">Login as Agent</button>
  <a onClick={()=>{console.log("Register")}} href="/Register">Register Here</a>
        </div>
    )
}
export default LandingForm;