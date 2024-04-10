import NavBar from "./NavBar";
import {useSelector} from "react-redux";
import Triangles from "./Triangles";
import "../styles/ListingDetails.css"
import { Carousel } from "react-bootstrap";
import { useState } from "react";
import "../styles/ProfileForm.css";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import axios from "axios";





function EditListing() {
  const currentAgent = useSelector((state) => state.user.currentUser.username);
  const [index, setindex] = useState(0);
  const BASE_URL = "http://localhost:3000";
  // const listing1 = {
  //   name:"PDR The Gardens at Your Mom's House",
  //   postalCode:649823,
  //   price:69.69,
  //   description:"ARC",
  //   address:'This is\nsupposed to be\nan address',
  //   bedroom:3,
  //   bathroom:2,
  //   images:["https://firebasestorage.googleapis.com/v0/b/rentlah-667e3.appspot.com/o/1711687189301download%20(1).jpeg?alt=media&token=359100cb-2c18-4666-8ba8-ccc80c88e025","https://firebasestorage.googleapis.com/v0/b/rentlah-667e3.appspot.com/o/1711687215981download.jpeg?alt=media&token=d05befb6-d255-4bc9-b217-fe8e05ce5a45"],
  //   agentRef:"agent1",
  //   latitude: 1.4332513,
  //   longitude: 103.7874458
  // };
  // const images = [];

  const handleSelect = (selectedIndex) => {
    setindex(selectedIndex);
};


const [imageUploadError, setImageUploadError] = useState(false);
const [uploading, setUploading] = useState(false);
const [error, setError] = useState({postalCode:""});

const [files,setFiles] = useState([]);
const [formData, setFormData] = useState({
  name:"",
  postalCode:0,
  description:"",
  bathroom:0,
  bedroom:0,
  price:0,
  agentRef:String(currentAgent),
  images: [], 
});

// const save = (downloadURL)=>
// {
//    images.push(downloadURL);
// }
const handleImageSubmit = (e) => {
  if (files.length > 0 && files.length<4) {
    setUploading(true);
    setImageUploadError(false);
     const promises = [];

     for (let i=0; i < files.length; i++){
      promises.push(storeImage(files[i]));
    }
    Promise.all(promises).then((urls) => {
      setFormData({
        ...formData,
        images: formData.images.concat(urls),
      });
      setUploading(false);
      setImageUploadError(false);

    }).catch((err) => {
      setImageUploadError("Image upload failed");
      setUploading(false);
    });
  } else {
    setImageUploadError("You can only upload 10 images per listing");
    setUploading(false);
  }
};

console.log(formData.images);

const storeImage = async (file) => {
    return new Promise ((resolve,reject) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef,file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = 
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          
          });
        }
      );
    });
};
console.log(formData)
const handleSubmit = async (event) =>
{
  event.preventDefault();
  setError({postalCode:""})
  try
  {
    const response = await axios.post(`${BASE_URL}/api/listing/create`, formData)
  console.log(response.data);

  }
  catch(error)
  {const e = error.response.data.message;
    if (e.type == "postalcode")
    {
      setError({postalCode:e.content});
    }

    console.log(error);
  }
  

}
console.log(error.postalCode);
const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_blank,i) => (i !==index))
    });
};

const handleChange = (event) =>
{
  const { name, value } = event.target;

setFormData((prevData) => ({
  ...prevData,
  [name]: value,
}));





}

const listing1 = {
  name:"PDR The Gardens at Your Mom's House",
  postalCode:649823,
  price:69.69,
  description:"ARC",
  address:'This is\nsupposed to be\nannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn ',
  bedroom:3,
  bathroom:2,
  images:["https://firebasestorage.googleapis.com/v0/b/rentlah-667e3.appspot.com/o/1711687189301download%20(1).jpeg?alt=media&token=359100cb-2c18-4666-8ba8-ccc80c88e025","https://firebasestorage.googleapis.com/v0/b/rentlah-667e3.appspot.com/o/1711687215981download.jpeg?alt=media&token=d05befb6-d255-4bc9-b217-fe8e05ce5a45"],
  agentRef:"agent1",
  latitude: 1.4332513,
  longitude: 103.7874458
};

// console.log(images);
  return (
    <>
      <header>
        <NavBar userType={userType}/>
      </header>

      <Triangles />
      
      
      <div className="formcontainer" style={{marginLeft:"10%", marginRight:"10%", marginTop:"5%", overflow: "hidden"}}>
          <form name="createListingForm" style={{paddingTop:"3%", paddingBottom:"0"}} onSubmit={handleSubmit}>
          <div className="row mb-0" style={{marginBottom:"3%"}}> 
          <div className="col"> <h1 className="text-center font-weight-bold" >Property Name: {listing1.name} </h1> </div>
          </div>

          <div className="row mt-0">
          <div className="col"><input className="form-control" type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required onKeyDown= {(event)=> (event.key === "Enter" ) && event.preventDefault()}></input></div>
          </div>

          <div className="row" style={{marginLeft:"-10%", marginRight:"-10%", marginTop:"2%"}}>
          <hr className="tophr"/>
          </div>

          <div className="row" style={{marginTop:"3%", marginBottom:"3%"}}> 
          <div className="col-lg-4"> <h1 className="text-start font-weight-bold" >Zip code: {listing1.postalCode}</h1> </div>
          <div className="col"><input className="form-control" type="text" placeholder="Zip code" name="postalCode" value={formData.postalCode === 0 ? "" : formData.postalCode} onChange={handleChange} required onKeyDown= {(event)=> (event.key === "Enter" || event.key ===" ") && event.preventDefault()}></input></div>
          </div>
          <span className="error">{error.postalCode}</span>

          
          <div className="row" style={{marginBottom:"3%"}}> 
          <div className="col-lg-4"> <h1 className="text-start font-weight-bold" >Description: </h1> </div>
          <div className="col"><input className="form-control" type="text" placeholder="Property Description" name="description" value={formData.description} onChange={handleChange} required onKeyDown= {(event)=> (event.key === "Enter" ) && event.preventDefault()}></input></div>
          </div>

          <div className="row gap-5" style={{marginBottom:"3%"}}>
          <div className="col-sm-2 text-center">
            <h1 className="text-start font-weight-bold" >Bathrooms: {listing1.bathroom}</h1>
          </div>
          <div className="col-sm-1 ml-0" style={{marginTop:"2%"}}>
            <input className="form-control" type="number" name="bathroom" value={formData.bathroom === 0 ? "" :formData.bathroom } onChange={handleChange} onScroll={(event)=>{event.preventDefault();}} required min="0" onWheel={(event)=>{event.preventDefault();}}/>
          </div>
          <div className="col-sm-2 text-center">
            <h1 className="text-start font-weight-bold" >Bedrooms: {listing1.bedroom}</h1>
          </div>
          <div className="col-sm-1 ml-0" style={{marginTop:"2%"}}>
            <input className="form-control" type="number" name="bedroom" value={formData.bedroom === 0 ? "" :formData.bedroom} onChange={handleChange} onScroll={(event)=>{event.preventDefault();}} required min="0" onWheel={(event)=>{event.preventDefault();}}/>
          </div>
          <div className="col-sm-2 text-center">
            <h1 className="text-start font-weight-bold" >Pricing: {listing1.price}</h1>
          </div>
          <div className="col-sm-2 ml-0" style={{marginLeft:"-2%", marginTop: "2%"}}>
            <div className="input-group mb-0">
              <span className="input-group-text" id="basic-addon1">SGD</span>
              <input className="form-control" type="number" name="price" value={formData.price === 0 ? "" :formData.price} onChange={handleChange} onScroll={(event)=>{event.preventDefault();}} required min="0" onWheel={(event)=>{event.preventDefault();}}/>
            </div>
            
          </div>
          </div>

          <div className="row overflow-visible" style={{marginLeft:"-5%", marginRight:"-5%", marginTop:"3%", marginBottom:"3%"}}>
            <hr className="tophr"/>
          </div>
          <div className="row justify-content-center" style={{ marginBottom:"1%"}}> 
            <div className="col text-end">
            <button type="submit" className="btn btn-primary loginSubmit" >
                Submit Edit
            </button>
            </div>

            <div className="col">
            <button type="submit" className="btn btn-primary loginSubmit" style={{background:"Gray"}}>
                Delete Listing
            </button>
            </div>
          </div>
          </form>
      </div>
      
    </>
  );
}


export default EditListing;
