import "../styles/Choice.css";
import { Link } from 'react-router-dom';
import loginimg from '../assets/loginimg.png';
import Logo from '../assets/Logo.png';


function LoginChoice()
{
    function handleClick(event)
    {
        window.location.href= "/login=" + event.target.name;
    }

    
    return (
        <>
    <div className="groupLogo ">
      <img
        src={Logo}
        alt="Rent Lah Logo"
        style={{maxHeight:"100%", left: "0%", maxWidth:"100%"}}
      />
    </div>

        <div className="d-grid gap-5">
  <button onClick={handleClick} name="Customer" className="btn btn-primary" type="button">Login as Customer</button>
  <button onClick={handleClick} name="Agent" className="btn btn-primary" type="button">Login as Agent</button>
  <a className="Choice" onClick={()=>{console.log("Register")}} href="/RegisterChoice" style={{color:"white"}}> Register Here</a>
        </div>
        
    <div className="imagecontainer img-fluid">
      <img
        src={loginimg}
        alt="City landscape"
        style={{ height: "100%", left: "0%" , maxWidth:"100%"}}
      />
    </div>

        </>
    )
}
export default LoginChoice;