import { useState } from "react";
import "../styles/LoginForm.css";
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
                    <h1 className="text-center">Agent Registration</h1>
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
