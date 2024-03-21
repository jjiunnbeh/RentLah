import { useState } from "react";

import "../styles/RegisterForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import loginimg from '../assets/loginimg.png';

function RegisterForm({ userType }) 
{
    const navigate = useNavigate();
//Set up useState hooks
        if (String(userType) === "customer")
        {
            const data = useState({
                username:"",
                password:"",
                passwordConfirm:"",
                email:"",
                phoneNo:null
        
            });

        }
        else{
            const data = useState({
                username:"",
                password:"",
                passwordConfirm:"",
                email:"",
                phoneNo:null,
                agentname:"",
                agentregnum:null
            });
        }

  
    function handleChange(event) 
    {
        const { name, value } = event.target;

        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    }    

    const handleSubmit = async (event) => 
    {    event.preventDefault();
        try {
          const response = await axios.post(`${BASE_URL}/api/auth/register-${userType}`, data);

          console.log(response.data);
          navigate("/login/" + userType);
            } catch (error) {
          // Handle register errors 
          setData({
            ...data,
            password: ""
          });
        }



        

    }
    

    return (
        <>
            <div className="formcontainer">
                <form name={userType} onSubmit={handleSubmit}>
                    <h1 className="text-center font-weight-bold" style={{color:"white"}}>{userType.charAt(0).toUpperCase() + userType.slice(1)} Registration</h1>
                    <div className="row justify-content-center">
                        <label htmlFor="inputUserName3" className="col-sm-8 col-form-label ">
                            Username
                        </label>
                        <div className="col-sm-8">
                            <input
                            type="text"
                            className="form-control"
                            id="inputUserName3"
                            placeholder="Username"
                            onChange={handleChange}
                            name="username"
                            onKeyDown= {(event)=> (event.key === "Enter" || event.key ===" ") && event.preventDefault()}
                            required
                            />
                        </div>
                    </div>
                    <br></br>
                    <div className="row justify-content-center">
                        <label htmlFor="inputEmail" className="col-sm-8 col-form-label ">
                            Email Address
                        </label>
                        <div className="col-sm-8">
                            <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            placeholder="Email Address"
                            onChange={handleChange}
                            name="email"
                            onKeyDown= {(event)=> (event.key === "Enter" || event.key ===" ") && event.preventDefault()}
                            required
                            />
                        </div>
                    </div>
                    {userType==="agent" &&
                    <>
                        <br></br>
                        <div className="row justify-content-center">
                            <label htmlFor="inputAgentName" className="col-sm-8 col-form-label ">
                            Agent Name
                            </label>
                                <div className="col-sm-8">
                                <input
                                type="text"
                                className="form-control"
                                id="inputAgentName"
                                placeholder="Agent Name"
                                onChange={handleChange}
                                name="agentname"
                                onKeyDown= {(event)=> (event.key === "Enter" || event.key ===" ") && event.preventDefault()}
                                required
                                />
                            </div>
                    </div>
                        <br></br>
                        <div className="row justify-content-center">
                            <label htmlFor="inputAgentRegNum" className="col-sm-8 col-form-label ">
                            Agent Registration Number
                            </label>
                                <div className="col-sm-8">
                                <input
                                type="text"
                                className="form-control"
                                id="inputAgentRegNum"
                                placeholder="Agent Registration Number"
                                onChange={handleChange}
                                name="agentregnum"
                                onKeyDown= {(event)=> (event.key === "Enter" || event.key ===" ") && event.preventDefault()}
                                required
                                />
                            </div>
                    </div>

                    </>
                    
                        
                        }
                    <br></br>
                    <div className="row justify-content-center">
                        <label htmlFor="inputPhoneNumber" className="col-sm-8 col-form-label ">
                            Phone Number
                        </label>
                        <div className="col-sm-8">
                                <input
                                type="tel"
                                className="form-control"
                                id="inputPhoneNumber"
                                placeholder="Phone Number"
                                onChange={handleChange}
                                name="phoneNo"
                                onKeyDown= {(event)=> (event.key === "Enter" || event.key ===" ") && event.preventDefault()}
                                required
                                />
                        </div>
                    </div>
                    <br></br>
                    <div className="row justify-content-center">
                        <label htmlFor="inputPassword" className="col-sm-8 col-form-label ">
                            Password
                        </label>
                        <div className="col-sm-8">
                            <input
                            type="password"
                            className="form-control"
                            id="inputPassword"
                            placeholder="Password"
                            onChange={handleChange}
                            name="password"
                            onKeyDown= {(event)=> (event.key === "Enter" || event.key ===" ") && event.preventDefault()}
                            required
                            />
                        </div>
                    </div>
                    <br></br>
                    <div className="row justify-content-center">
                        <label htmlFor="inputPasswordConfirmation" className="col-sm-8 col-form-label ">
                            Password Confirmation
                        </label>
                        <div className="col-sm-8">
                            <input
                            type="password"
                            className="form-control"
                            id="inputPasswordConfirmation"
                            placeholder="Password Confirmation"
                            onChange={handleChange}
                            name="passwordconfirm"
                            onKeyDown= {(event)=> (event.key === "Enter" || event.key ===" ") && event.preventDefault()}
                            required
                            />
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="row justify-content-center">
                        <button type="submit" className="btn btn-primary loginSubmit" >
                            Register
                        </button>
                    </div>


                </form>
            </div>
            <div className="imagecontainer">
                <img
                    src={loginimg}
                    alt="City landscape"
                    style={{ height: "100%", left: "0%" }}
                />
            </div>
        </>
    );
}

export default RegisterForm;
