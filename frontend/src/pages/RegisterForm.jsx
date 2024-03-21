import { useState } from "react";
import "../styles/RegisterForm.css";
import Axios from "axios";
import {loginService} from "../service/LoginService";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { Link } from "react-router-dom";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import loginimg from '../assets/loginimg.png';

function RegisterForm({ user }) 
{
  
    function handleChange(event) 
    {}    

    const handleSubmit = async (event) => 
    {}

    return (
        <>
            <div className="formcontainer">
                <form name={user} onSubmit={handleSubmit}>
                    <h1 className="text-center font-weight-bold" style={{color:"white"}}>{user} Registration</h1>
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
                    {user=="Agent" &&
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
                                name="phone number"
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
                            name="password confirmation"
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
