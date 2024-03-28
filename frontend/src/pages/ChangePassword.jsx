import { useState, useEffect } from "react";
import "../styles/RegisterForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import loginimg from '../assets/loginimg.png';

function ChangePassword({ userType }) 
{


   
    

    return (
        <>
            <div className="formcontainer" style={{marginTop:"10%"}}>
                <form name="changePassword">
                <h1 className="text-center font-weight-bold" style={{color:"white"}}> Change Password</h1>
                <div className="row justify-content-center">
                        <label htmlFor="inputPassword" className="col-sm-8 col-sm-7 col-form-label ">
                            New Password
                        </label>
                        <div className="col-sm-8">
                            <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            placeholder="New Password"
                            name="password"
                            onKeyDown= {(event)=> (event.key === "Enter" || event.key ===" ") && event.preventDefault()}
                            required
                            />
                        </div>
                        {/* <span>{error.password}</span> */}
                </div>
                <br></br>
                <div className="row justify-content-center">
                        <label htmlFor="inputPasswordConfirmation" className="col-sm-8 col-sm-7 col-form-label ">
                            Confirm Password
                        </label>
                        <div className="col-sm-8">
                            <input
                            type="password"
                            className="form-control"
                            id="newPasswordConfirmation"
                            placeholder="Confirm Password"
                            name="passwordconfirm"
                            onKeyDown= {(event)=> (event.key === "Enter" || event.key ===" ") && event.preventDefault()}
                            required
                            />
                        </div>
                        {/* <span>{error.passwordconfirm}</span> */}
                </div>
                <br></br>

                    <div className="row justify-content-center">
                        <button type="submit" className="btn btn-primary loginSubmit" >
                            Confirm
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

export default ChangePassword;

