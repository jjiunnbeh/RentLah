import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword({ userType }) {
    const BASE_URL = 'http://localhost:3000'; 
    const [data, setData] = useState({
        email:"",
        userType : String(userType),
    });
    const navigate = useNavigate();

    const handleChange = (event) => {

        setData({email: event.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/api/auth/forget-pass`, data
 );
            if (res.status === 200) {
                navigate('/');
            }
        } catch (error) {
            console.log("error here")
            console.log(error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h4>Forgot Password</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control"
                            onChange={handleChange}
                            value={data.email}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
