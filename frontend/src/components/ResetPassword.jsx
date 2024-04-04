import { useState } from "react";
import "../styles/RegisterForm.css";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import loginimg from '../assets/loginimg.png';



function ResetPassword({ userType }) 
{
    
    const BASE_URL = 'http://localhost:3000';
    const {id, token} = useParams();
    const [data, setData] = useState({
        password:"",
        passwordconfirm:"",
        userType:userType,
        id:id,
        token:token,
        userType:userType
    });
    console.log(id);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
                const response = await axios.put(`${BASE_URL}/api/user/resetPassword`, data);
                if (response.status == 200)
                {
                    console.log("Success");
                    navigate("/login/" + userType);
                }
            
            }    catch(error)
    {
      console.log(error);
    }

            
            // const response = await axios.post(`${BASE_URL}/reset-pass/${userType}/${id}/${token}`, data);

           
    }
const navigate = useNavigate();
    const handleChange = (event) =>
    {
        const { name, value } = event.target;

        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    }

    return (
        <form onSubmit={handleSubmit}>
   <div className="row justify-content-center">
                        <label htmlFor="inputPassword" className="col-sm-8 col-sm-7 col-form-label ">
                            Password
                        </label>
                        <div className="col-sm-8">
                            <input
                            type="password"
                            className="form-control"
                            id="inputPassword"
                            placeholder="Password"
                            onChange={handleChange}
                            value={data.password}
                            name="password"
                            onKeyDown= {(event)=> (event.key === "Enter" || event.key ===" ") && event.preventDefault()}
                            required
                            />
                        </div>
                        {/* <span className="error">{error.password}</span> */}
                    </div>
                    <br></br>
                    <div className="row justify-content-center">
                        <label htmlFor="inputPasswordConfirmation" className="col-sm-8 col-sm-7 col-form-label ">
                            Password Confirmation
                        </label>
                        <div className="col-sm-8">
                            <input
                            type="password"
                            className="form-control"
                            id="inputPasswordConfirmation"
                            placeholder="Password Confirmation"
                            onChange={handleChange}
                            value={data.passwordconfirm}
                            name="passwordconfirm"
                            onKeyDown= {(event)=> (event.key === "Enter" || event.key ===" ") && event.preventDefault()}
                            required
                            />
                        </div>
                        {/* <span className="error">{error.passwordconfirm}</span> */}
                    </div>
                    <div className="row justify-content-center">
                        <button type="submit" className="btn btn-primary loginSubmit" >
                            Confirm
                        </button>
                    </div>
        </form>
    );
}
export default ResetPassword;

