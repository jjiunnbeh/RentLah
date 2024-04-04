
import { useState, useEffect } from "react";
import "../styles/RegisterForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import loginimg from '../assets/loginimg.png';



function ForgetPassword({ userType }) 
{

    const BASE_URL = 'http://localhost:3000';
    const [data,setData] = useState({
        email:"",
        userType,
    })

    function handleChange(event) 
    {
      const { name, value } = event.target;
  
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

async function handleSubmit(event)
{
    event.preventDefault();
    const response = await axios.post(`${BASE_URL}/api/auth/forget-pass`, data);
    if (response.status == 200)
    {
        console.log(response.data);
        const email = response.data.email;
        const userType = (response.data.userType).toLowerCase();
        const token = response.data.token;
        const id = response.data.id;
        sendEmail(email, userType, token,id);

    }

}
async function sendEmail(email, userType, token, id)
{
    try
    {
        const response = await axios.post(`${BASE_URL}/api/auth/forget-pass/sendemail`, {email, userType,token, id});

    }catch(error)
    {
        console.log(error);
    }
    

}



   
    

    return (
        <>
            <div className="formcontainer" style={{marginTop:"10%"}}>
                <form name="changePassword" onSubmit={handleSubmit}>
                <h1 className="text-center font-weight-bold" style={{color:"white"}}> Enter your email</h1>
                <div className="row justify-content-center">
                        <label htmlFor="inputEmail" className="col-sm-8 col-sm-7 col-form-label ">
                            Email
                        </label>
                        <div className="col-sm-8">
                            <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            name="email"
                            value={data.email}
                            onKeyDown= {(event)=> (event.key === "Enter" || event.key ===" ") && event.preventDefault()}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        {/* <span>{error.password}</span> */}
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

export default ForgetPassword;

