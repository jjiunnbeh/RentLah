import "../styles/Choice.css";
import { Link } from 'react-router-dom';
import loginimg from '../assets/loginimg.png';
import Logo from '../assets/Logo.png';


function RegisterChoice()
{
    function handleClick(event)
    {
        window.location.href= "/register/" + event.target.name;
    }

    
    return (
    <>
      <img
      className="groupLogo img-fluid"
        src={Logo}
        alt="Rent Lah Logo"
        style={{maxHeight:"80%", maxWidth:"80%"}}
      />

    <div className="d-grid gap-5 " style={{marginTop:"12%"}}>
      <button onClick={handleClick} name="customer" className="btn btn-primary" type="button" style={{fontSize:"25px"}}>Register as Customer</button>
      <button onClick={handleClick} name="agent" className="btn btn-primary" type="button"style={{fontSize:"25px"}}>Register as Agent</button>
    <a className="Choice" href="/login"style={{fontSize:"25px"}}>Have account? Login Here</a>
    </div>

    <div className="imagecontainer">
      <img
        src={loginimg}
        alt="City landscape"
        style={{ height: "100%", left: "0%" }}
      />
    </div>
    </>
    )
}

export default RegisterChoice;