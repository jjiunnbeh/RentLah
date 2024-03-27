// import {useSelector} from "react-redux";
// import NavBar from "./NavBar";

// function ProfileForm()
// {
//     const userType = useSelector((state) => state.user.currentUser.rest.userType);
// console.log(userType)
// const currentUser = useSelector((state) => state.user.currentUser.rest);
// // console.log(currentUser )
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
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import {app} from "../firebase"

function ProfileForm() {
  const userType = useSelector((state) => state.user.currentUser.rest.userType);
  console.log(userType);
  const currentUser = useSelector((state) => state.user.currentUser.rest);

  const [data, setData] = useState({});
  const [file, setFile] = useState(undefined);

  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const fileRef = useRef(null);
  // const handleFileUpload = (file) => {
  //   const storage = getStorage(app);

  //   const fileName = new Date().getTime() + file.name;
  //   const storageRef = ref(storage, fileName);
  //   const uploadTask = uploadBytesResumable(storageRef, file);
    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     setFilePerc(Math.round(progress));
    //   },
    //   (error) => {
    //     setFileUploadError(error);
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
    //       setData({ ...data, profilepic: downloadURL })
    //     );
    //   }
    // );
  // };



useEffect(()=>{
  if (file)
  {
    handleFileUpload(file)
  }
},[file]);

async function handleFileUpload(file)
{
  const storage = getStorage(app);
  //Give the new file a new name
  const fileName = new Date().getTime()+ file.name;
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
      getDownloadURL(uploadJob.snapshot.ref).then((downloadURL) =>{
      setData({ ...data, profilepic: downloadURL });
      console.log(downloadURL)}
      )
      
    }
    
  );
  


};

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <div>hello</div>

      <input
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
      />
      <img
        onClick={() => fileRef.current.click()}
        src={data.profilepic || currentUser.profilepic}
        alt="profile"
        className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
      />

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
