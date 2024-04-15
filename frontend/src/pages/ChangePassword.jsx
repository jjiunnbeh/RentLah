import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import "../styles/RegisterForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import loginimg from "../assets/loginimg.png";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

function ChangePassword({ userType }) {
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:3000";
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [data, setData] = useState({
    old: "",
    newPass: "",
    username: currentUser.username,
    userType: String(userType),
  });
  const [hidenew, setHideNew] = useState(true);
  const [hideold, setHideOld] = useState(true);

  function handleClickHideOld(event) {
    event.preventDefault();
    setHideOld(!hideold);
  }

  function handleClickHideNew(event) {
    event.preventDefault();
    setHideNew(!hidenew);
  }

  const [error, setError] = useState({
    oldpassword: "",
    password: "",
  });

  async function handleSubmit(event) {
    setError({ oldpassword: "", password: "" });

    event.preventDefault();
    console.log(data);
    try {
      dispatch(updateUserStart());
      const response = await axios.post(
        `${BASE_URL}/api/user/change-password`,
        data
      );
      if (response.status == 200) {
        navigate("/login/" + userType);
      }
    } catch (error) {
      const e = error.response.data.message;
      console.log(e);
      if (e.type === "password") {
        console.log(e.content);
        setError({ password: e.content });
      }
      if (e.type === "oldpassword") {
        setError({ oldpassword: e.content });
        console.log(e.content);
      }
      console.log(error);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <>
      <div className="formcontainer" style={{ marginTop: "10%" }}>
        <form name="changePassword" onSubmit={handleSubmit}>
          <h1
            className="text-center font-weight-bold"
            style={{ color: "white" }}
          >
            {" "}
            Change Password
          </h1>
          <div className="row justify-content-center">
            <label
              htmlFor="inputPassword"
              className="col-sm-8 col-sm-7 col-form-label "
            >
              Old Password
            </label>
            <div className="col-sm-8">
              <div className="input-group">
                <input
                  type={hideold ? "password" : "text"}
                  className="form-control"
                  id="oldPassword"
                  placeholder="Old Password"
                  onChange={handleChange}
                  name="old"
                  value={data.old}
                  onKeyDown={(event) =>
                    (event.key === "Enter" || event.key === " ") &&
                    event.preventDefault()
                  }
                  required
                />
                <button
                  className="btn"
                  onClick={handleClickHideOld}
                  id="monkey-emoji"
                  style={{ backgroundColor: "white" }}
                >
                  {hideold ? "🙈" : "🙊"}
                </button>
              </div>
            </div>
            <span>{error.oldpassword}</span>
          </div>
          <br></br>
          <div className="row justify-content-center">
            <label
              htmlFor="inputPasswordConfirmation"
              className="col-sm-8 col-sm-7 col-form-label "
            >
              New Password
            </label>
            <div className="col-sm-8">
              <div className="input-group">
                <input
                  type={hidenew ? "password" : "text"}
                  className="form-control"
                  id="newPassword"
                  placeholder="New Password"
                  onChange={handleChange}
                  name="newPass"
                  value={data.newPass}
                  onKeyDown={(event) =>
                    (event.key === "Enter" || event.key === " ") &&
                    event.preventDefault()
                  }
                  required
                />
                <button
                  className="btn"
                  onClick={handleClickHideNew}
                  id="monkey-emoji"
                  style={{ backgroundColor: "white" }}
                >
                  {hidenew ? "🙈" : "🙊"}
                </button>
              </div>
            </div>
            <span>{error.password}</span>
          </div>
          <br></br>

          <div className="row justify-content-center">
            <button type="submit" className="btn btn-primary loginSubmit">
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
