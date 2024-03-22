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
    <div>
      <header>
        <NavBar />
      </header>
      <div>hello</div>
      <a href="/login=Agent">
        <img src={formData.avatar} alt="profile picture" />
      </a>
      {userType === "Agent" ? (
        <form>
          <input placeholder="Agent" />
        </form>
      ) : (
        <form>
          <input placeholder="Customer" />
        </form>
      )}
    </div>
  );
}

export default ProfileForm;
