import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/NavBar";
import Triangles from "../components/Triangles";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import "../styles/ProfileForm.css";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import axios from "axios";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

function ProfileForm() {
  const signOut = useSignOut();
  const BASE_URL = "http://localhost:3000";
  const navigate = useNavigate();
  const userType = useSelector((state) => state.user.currentUser.userType);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const [error, setError] = useState({
    email: "",
    phoneNo: "",
    ...(userType === "Agent" && { agentregnum: "" }),
  });

  const [data, setData] = useState({ profilepic: currentUser.profilepic });
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: "",
    phoneNo: "",
    ...(userType === "Agent" && { agentregnum: "" }),
  });
  const [file, setFile] = useState(undefined);

  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  function handleChangePassword() {
    navigate("/change-password/" + userType.toLowerCase());
  }
  async function saveProfileImage(downloadURL) {
    try {
      dispatch(updateUserStart());
      const username = currentUser.username;
      const imageurl = downloadURL;
      const response = await axios.put(
        `${BASE_URL}/api/user/update/profilepic`,
        { username, imageurl, userType }
      );
      if (response.status == 200) {
        dispatch(updateUserSuccess(response.data.rest));
        console.log("ok");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleFileUpload(file) {
    const storage = getStorage(app);
    //Give the new file a new name
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadJob = uploadBytesResumable(storageRef, file);

    uploadJob.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(uploadJob.snapshot.ref).then((downloadURL) => {
          setData({ profilepic: downloadURL });

          console.log(downloadURL);
          saveProfileImage(downloadURL);
        });
      }
    );
  }
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({
      email: "",
      phoneNo: "",
      ...(userType === "Agent" && { agentregnum: "" }),
    });
    try {
      dispatch(updateUserStart());
      const response = await axios.put(
        `${BASE_URL}/api/user/update/${userType}`,
        formData
      );
      if (response.status == 200) {
        dispatch(updateUserSuccess(response.data.rest));
      }
    } catch (error) {
      console.log(error);
      const e = error.response.data.message;
      if (e.type === "email") {
        console.log(e.content);
        setError({ email: e.content });
      }
      if (e.type === "phoneNo") {
        console.log(e.content);
        setError({ phoneNo: e.content });
      }
      if (e.type === "agentregnum") {
        console.log(e.content);
        setError({ agentregnum: e.content });
      }
    }
  };

  return (
    <>
      <header>
        <NavBar userType={userType}/>
      </header>

      <Triangles />

      <div
        className="row"
        style={{ marginLeft: "10%", marginRight: "10%", marginTop: "3%" }}
      >
        <div className="col-md-auto">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={data.profilepic}
            alt="profile"
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50px",
              marginLeft: "100px",
            }}
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          />
        </div>

        <div className="col col-lg-2" />
        <div className="col d-flex align-items-center">
          <div className="row">
            {userType === "agent" && (
              <h1 className="mb-3 font-weight-bold font">
                Name: {currentUser.name}
              </h1>
            )}
            <h1 className="mb-3 font-weight-bold">
              Username: {currentUser.username}
            </h1>
          </div>
        </div>
      </div>
      <div
        className="row"
        style={{ marginLeft: "10%", marginRight: "10%", marginTop: "3%" }}
      >
        <hr className="tophr" />
      </div>
      <div
        className="formcontainer"
        style={{ marginLeft: "10%", marginRight: "10%" }}
      >
        <form
          name="profileForm"
          style={{ paddingTop: "3%", paddingBottom: "0" }}
          onSubmit={handleSubmit}
        >
          <div className="row" style={{ marginBottom: "3%" }}>
            <div className="col">
              {" "}
              <h1 className="text-start font-weight-bold">
                Email: {currentUser.email}{" "}
              </h1>{" "}
            </div>
            <div className="col-lg-4">
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              ></input>
            </div>
            <span className="error">{error.email}</span>
          </div>

          <div className="row" style={{ marginBottom: "3%" }}>
            <div className="col">
              {" "}
              <h1 className="text-start font-weight-bold">
                Phone Number: {currentUser.phoneNo}{" "}
              </h1>{" "}
            </div>
            <div className="col-lg-4">
              <input
                className="form-control"
                type="text"
                placeholder="Phone Number"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
              ></input>
            </div>
            <span className="error">{error.phoneNo}</span>
          </div>

          {userType === "Agent" && (
            <>
              <div className="row" style={{ marginBottom: "3%" }}>
                <div className="col">
                  {" "}
                  <h1 className="text-start font-weight-bold">
                    Registration Number: {currentUser.agentregnum}{" "}
                  </h1>{" "}
                </div>
                <div className="col-lg-4">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Registration Number"
                    name="agentregnum"
                    value={formData.agentregnum}
                    onChange={handleChange}
                  ></input>
                </div>
                <span className="error">{error.agentregnum}</span>
              </div>
            </>
          )}
          <div className="row justify-content-center">
            <button type="submit" className="btn btn-primary loginSubmit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <div
        className="row"
        style={{ marginLeft: "10%", marginRight: "10%", marginTop: "3%" }}
      >
        <hr className="tophr" />
      </div>

      <div className="row" style={{ marginTop: "3%" }}>
        <div className="col d-flex justify-content-end">
          <button
            onClick={handleChangePassword}
            type="submit"
            className="btn btn-primary loginSubmit"
          >
            Change Password
          </button>
        </div>
        <div className="col">
          <button
            onClick={() => {
              signOut();
              navigate("/login");
            }}
            type="reset"
            className="btn btn-primary loginSubmit"
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileForm;
