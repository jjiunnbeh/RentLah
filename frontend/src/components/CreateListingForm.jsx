import { useSelector, useDispatch} from "react-redux";
import NavBar from "./NavBar";
import Triangles from "./Triangles";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import {app} from "../firebase" 
import "../styles/ProfileForm.css"
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import axios from "axios";
import { updateUserFailure,updateUserStart,updateUserSuccess } from "../redux/user/userSlice";




function CreateListingForm() {
  const BASE_URL = 'http://localhost:3000';
  const userType = useSelector((state) => state.user.currentUser.userType);

  const dispatch = useDispatch();

  console.log(userType);
  const currentUser = useSelector((state) => state.user.currentUser);


  const [data, setData] = useState({profilepic:currentUser.profilepic});
  const [file, setFile] = useState(undefined);

  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const fileRef = useRef(null);



useEffect(()=>{
  if (file)
  {
    handleFileUpload(file)
  }
},[file]);

async function saveProfileImage(downloadURL)
{
  try{
    dispatch(updateUserStart());
  const username = currentUser.username;
  const imageurl = downloadURL;
  const response = await axios.put(`${BASE_URL}/api/user/update/profilepic`, {username ,imageurl, userType});
  if (response.status == 200)
  {
    dispatch(updateUserSuccess(response.data.rest));
    console.log("ok");
  }
  }catch(error)
  {
    console.log(error);
  }
  
}
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
      setData({ profilepic: downloadURL });
      
      console.log(downloadURL)
      saveProfileImage(downloadURL);
      
    }
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
      
      
      <div className="row justify-content-center gap-4" style={{marginLeft:"10%", marginRight:"10%", marginTop:"3%", height:"300px"}}>
        {/* <div className="col-md-auto">
          <input
            onChange = {(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            />
            <img 
          onClick={() => fileRef.current.click()} 
          src={" "} 
          alt="listingimage1" 
          style={{width:"300px", height:"300px", marginLeft:"100px"}}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" 
          />
        </div>
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
          src={" "} 
          alt="listingimage2" 
          style={{width:"300px", height:"300px", marginLeft:"100px"}}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" 
          />
        </div>
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
          src={" "} 
          alt="listingimage3" 
          style={{width:"300px", height:"300px", marginLeft:"100px"}}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" 
          />
        </div> */}
        
        
      </div>
      <div className="row" style={{marginLeft:"10%", marginRight:"10%", marginTop:"4%"}}>

        <div className="row justify-content-center" style={{marginBottom: "1%"}}>
            <button type="submit" className="btn btn-primary loginSubmit" >
                Upload images
            </button>
        </div>
        <hr className="tophr"/>
      </div>
      <div className="formcontainer" style={{marginLeft:"10%", marginRight:"10%"}}>
          <form name="createListingForm" style={{paddingTop:"3%", paddingBottom:"0"}}>
          <div className="row" style={{marginBottom:"3%"}}> 
          <div className="col-lg-4"> <h1 className="text-start font-weight-bold" >Property Name: </h1> </div>
          <div className="col"><input className="form-control" type="text" placeholder="Name"></input></div>
          </div>

          <div className="row" style={{marginBottom:"3%"}}> 
          <div className="col-lg-4"> <h1 className="text-start font-weight-bold" >Property Address: </h1> </div>
          <div className="col"><input className="form-control" type="text" placeholder="Address"></input></div>
          </div>

          
          <div className="row" style={{marginBottom:"3%"}}> 
          <div className="col-lg-4"> <h1 className="text-start font-weight-bold" >Description: </h1> </div>
          <div className="col"><input className="form-control" type="text" placeholder="Registration Number"></input></div>
          </div>

          <div className="row gap-5" style={{marginBottom:"3%"}}>
          <div className="col-sm-2 text-center">
            <h1 className="text-start font-weight-bold" >Bathrooms: </h1>
          </div>
          <div className="col-sm-1 ml-0">
            <input className="form-control" type="number"/>
          </div>
          <div className="col-sm-2 text-center">
            <h1 className="text-start font-weight-bold" >Bedrooms: </h1>
          </div>
          <div className="col-sm-1 ml-0">
            <input className="form-control" type="number"/>
          </div>
          <div className="col-sm-2 text-center">
            <h1 className="text-start font-weight-bold" >Pricing: </h1>
          </div>
          <div className="col-sm-1 ml-0">
            <input className="form-control" type="number"/>
          </div>
          </div>

          <div className="row overflow-visible" style={{marginLeft:"-5%", marginRight:"-5%", marginTop:"3%", marginBottom:"3%"}}>
            <hr className="tophr"/>
          </div>
          <div className="row justify-content-center" style={{ marginBottom:"1%"}}> 
            <button type="submit" className="btn btn-primary loginSubmit" >
                Save Changes
            </button>
          </div>
          </form>
      </div>
      
    </>
  );
}


export default CreateListingForm;
