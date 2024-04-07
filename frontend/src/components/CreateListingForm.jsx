import NavBar from "../components/NavBar";
import {useSelector} from "react-redux";
import Triangles from "../components/Triangles";
import "../styles/ListingDetails.css"
import { Carousel } from "react-bootstrap";
import { useState } from "react";
import "../styles/ProfileForm.css";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";





function CreateListingForm() {
  const [index, setindex] = useState(0);
  const listing1 = {
    name:"PDR The Gardens at Your Mom's House",
    postalCode:649823,
    price:69.69,
    description:"ARC",
    address:'This is\nsupposed to be\nan address',
    bedroom:3,
    bathroom:2,
    images:["https://firebasestorage.googleapis.com/v0/b/rentlah-667e3.appspot.com/o/1711687189301download%20(1).jpeg?alt=media&token=359100cb-2c18-4666-8ba8-ccc80c88e025","https://firebasestorage.googleapis.com/v0/b/rentlah-667e3.appspot.com/o/1711687215981download.jpeg?alt=media&token=d05befb6-d255-4bc9-b217-fe8e05ce5a45"],
    agentRef:"agent1",
    latitude: 1.4332513,
    longitude: 103.7874458
  };

  const handleSelect = (selectedIndex) => {
    setindex(selectedIndex);
};

const [imageUploadError, setImageUploadError] = useState(false);
const [uploading, setUploading] = useState(false);

const [files,setFiles] = useState([]);
const [formData, setFormData] = useState({
  imageUrls: [], 
});


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
        imageUrls: formData.imageUrls.concat(urls),
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


const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_blank,i) => (i !==index))
    });
};


  return (
    <>
      <header>
        <NavBar />
      </header>

      <Triangles />
      
      
      <div className="row justify-content-center" style={{marginLeft:"20%", marginRight:"20%", marginTop:"3%", height:"500px"}}>
           <Carousel activeIndex={index} onSelect={handleSelect} >
                    {
                        [...Array(formData.imageUrls.length)].map((url,i) => <Carousel.Item key={i} interval={null}>
                                                                        <div className="d-flex justify-content-center">
                                                                          <img src={formData.imageUrls[i]} alt="Listing image" style={{height:"500px", width:"800px"}}/>
                                                                          <button type="button" className="btn btn-danger text-center" onClick={ () => handleRemoveImage(index)} style={{position:"absolute", marginRight:"-60%", marginTop:"2%"}}>
                                                                            Delete
                                                                          </button>
                                                                        </div>
                                                                        </Carousel.Item>)
                    }
            </Carousel>
        
        
      </div>

      <div className="row text-center justify-content-center" style={{marginBottom: "1%",marginTop:"1%", marginLeft: "25%",marginRight: "25%" }}>
          <input multiple type="file"  onChange={(e) => setFiles(e.target.files)}/>
          


          <button type="button" onClick={handleImageSubmit} className="btn btn-primary loginSubmit" >
            Upload
          </button>

         

        
        </div>
        <div className="row text-center">
        <p className="text-danger">{imageUploadError && imageUploadError}</p>
        </div>
      <div className="row" style={{marginLeft:"10%", marginRight:"10%", marginTop:"1%"}}>
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
          <div className="col"><input className="form-control" type="text" placeholder="Property Description"></input></div>
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
          <div className="col-sm-2 ml-0" style={{marginLeft:"-2%"}}>
            <div className="input-group mb-0">
              <span class="input-group-text" id="basic-addon1">SGD</span>
              <input className="form-control" type="number"/>
            </div>
            
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
