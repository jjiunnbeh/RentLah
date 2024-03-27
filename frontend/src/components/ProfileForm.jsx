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
import Triangles from "./Decoration";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import {app} from "../firebase" 
import "../styles/ProfileForm.css"

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
    <>
      <header>
        <NavBar />
      </header>

      <Triangles />
      
      <div className="row" style={{marginLeft:"10%", marginRight:"10%", marginTop:"3%"}}>
        <div className="col-md-auto">
          <input
            onChange = {(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            />
            <img 
          onClick={() => fileRef.current.click()} 
          src={data.profilepic || currentUser.profilepic} 
          alt="profile" 
          style={{width:"300px", height:"300px", borderRadius:"50px", marginLeft:"100px"}}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" 
          />
        
        </div>
        
        <div className="col col-lg-2"/>
        <div className="col d-flex align-items-center">
          <div className="row">
            {userType==="agent" && <h1 className="mb-3 font-weight-bold font">Name: {currentUser.name}</h1>}
            <h1 className="mb-3 font-weight-bold">Username: {currentUser.username}</h1>
          </div>
        </div>
      </div>
      <div className="row" style={{marginLeft:"10%", marginRight:"10%", marginTop:"3%"}}>
        <hr className="tophr"/>
      </div>
      <div className="formcontainer" style={{marginLeft:"10%", marginRight:"10%"}}>
          <form name="profileForm" style={{paddingTop:"3%", paddingBottom:"0"}}>
          <div className="row" style={{marginBottom:"3%"}}> 
          <div className="col"> <h1 className="text-start font-weight-bold" >Email: {currentUser.email} </h1> </div>
          <div className="col-lg-4"><input className="form-control" type="email" placeholder="Email"></input></div>
          </div>

          <div className="row" style={{marginBottom:"3%"}}> 
          <div className="col"> <h1 className="text-start font-weight-bold" >Phone Number: {currentUser.phoneNo} </h1> </div>
          <div className="col-lg-4"><input className="form-control" type="text" placeholder="Phone Number"></input></div>
          </div>

          {userType==="Agent" &&
          <>
          <div className="row" style={{marginBottom:"3%"}}> 
          <div className="col"> <h1 className="text-start font-weight-bold" >Registration Number: {currentUser.agentregnum} </h1> </div>
          <div className="col-lg-4"><input className="form-control" type="text" placeholder="Registration Number"></input></div>
          </div>

          </>}
          <div className="row justify-content-center">
            <button type="submit" className="btn btn-primary loginSubmit" >
                Save Changes
            </button>
          </div>
          </form>
      </div>
      <div className="row" style={{marginLeft:"10%", marginRight:"10%", marginTop:"3%"}}>
        <hr className="tophr"/>
      </div>

      <div className="row" style={{marginTop:"3%"}}>
        <div className="col d-flex justify-content-end">
        <button type="submit" className="btn btn-primary loginSubmit" >
                Change Password
            </button>
        </div>
        <div className="col">
        <button type="reset" className="btn btn-primary loginSubmit" >
                Log Out
            </button>
        </div>
      </div>
      
    </>
  );
}


export default ProfileForm;
