import "../styles/LandingForm.css";
function LandingForm()
{
    return (
        <div className="d-grid gap-2">
  <button className="btn btn-primary" type="button">Login as Customer</button>
  <button className="btn btn-primary" type="button">Login as Agent</button>
  <a href="/signup">Register Here</a>
        </div>
    )
}
export default LandingForm;