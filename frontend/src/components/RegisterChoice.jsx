import "../styles/Choice.css";
import { Link } from 'react-router-dom';
import loginimg from '../assets/loginimg.png';
import Logo from '../assets/Logo.png';


function RegisterChoice()
{
    function handleClick(event)
    {
        window.location.href= "/register=" + event.target.name;
    }

    
    return (
    <>
    <div className="groupLogo">
      <img
        src={Logo}
        alt="Rent Lah Logo"
        style={{ height: "100%", left: "0%" }}
      />
    </div>

    <div className="d-grid gap-5 ">
      <button onClick={handleClick} name="Customer" className="btn btn-primary" type="button">Register as Customer</button>
      <button onClick={handleClick} name="Agent" className="btn btn-primary" type="button">Register as Agent</button>
    <a className="Choice" href="/LoginChoice">Have account? Login Here</a>
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