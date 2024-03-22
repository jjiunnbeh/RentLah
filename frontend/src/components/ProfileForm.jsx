// import {useSelector} from "react-redux";
// import NavBar from "./NavBar";

// function ProfileForm()
// {
//     const userType = useSelector((state) => state.user.currentUser.rest.userType);
// console.log(userType)
// const currentUser = useSelector((state) => state.user.currentUser.rest);
// console.log(currentUser )
// return (
// <div>
// <header><NavBar/></header>
// <div>hello</div>
// <a href="/login=Agent"><img src={currentUser.profilepic} alt = "profile picture"></img></a>
// {userType == "Agent" ? <form><input placeholder="Agent"/></form>: <form><input placeholder="Customer"/></form>}
// </div>);

// }
// export default ProfileForm

/*---------------------------------------------------------------------------------------*/

import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import { useRef, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebaseConfig from "../../../backend/firebase.js"
import "../styles/ProfileForm.css"


const app = initializeApp(firebaseConfig);

function ProfileForm() {
  const userType = useSelector((state) => state.user.currentUser.rest.userType);
  const currentUser = useSelector((state) => state.user.currentUser.rest);
  const [formData, setFormData] = useState({
    avatar: currentUser.profilepic || "",
  });
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);

    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="row" style={{marginLeft:"10%", marginRight:"10%", marginTop:"3%"}}>
        <div className="col-md-auto">
          <a href="/login=Agent">
            <img src={formData.avatar} alt="profile picture" className="img-thumbnail" 
            style={{width:"200px", height:"200px"}}
            />
          </a>
        </div>
        <div className="col col-lg-2"/>
        <div className="col align-items-center">
          <div className="row">
            <h1 className="font-weight-bold">Name</h1>
            <h1 className="font-weight-bold">Username</h1>
          </div>
        </div>
      </div>
      <div className="row" style={{marginLeft:"10%", marginRight:"10%", marginTop:"3%"}}>
        <hr className="border border-danger border-2 opacity-50"/>
      </div>
    </>
  );
}

export default ProfileForm;
