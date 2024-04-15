import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import Triangles from "../components/Triangles";
import "../styles/ListingDetails.css";
import { Carousel } from "react-bootstrap";
import { useState } from "react";
import "../styles/ProfileForm.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

function CreateListingForm() {
  const currentAgent = useSelector((state) => state.user.currentUser.username);
  const userType = useSelector((state) => state.user.currentUser.userType);
  const [index, setindex] = useState(0);
  const BASE_URL = "http://localhost:3000";

  const handleSelect = (selectedIndex) => {
    setindex(selectedIndex);
  };

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState({ postalCode: "", error: "" });
  const [success, setSuccess] = useState(false);

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    postalCode: 0,
    description: "",
    bathroom: 0,
    bedroom: 0,
    price: 0,
    agentRef: String(currentAgent),
    images: [],
  });

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length < 11) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            images: formData.images.concat(urls),
          });
          setUploading(false);
          setImageUploadError(false);
        })
        .catch((err) => {
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
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
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
  console.log(formData);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({ postalCode: "", images: "" });
    try {
      const response = await axios.post(
        `${BASE_URL}/api/listing/create`,
        formData
      );
      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          window.location.reload();
        }, 1000);
      }
      console.log(response.data);
    } catch (error) {
      const e = error.response.data.message;
      if (e.type == "postalcode") {
        setError({ postalCode: e.content });
      }
      if (e.type == "images") {
        setError({ images: e.content });
      }

      console.log(error);
    }
  };
  console.log(error.postalCode);
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_blank, i) => i !== index),
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {userType === "Agent" ? (
        <>
          <header>
            <NavBar userType={userType} />
          </header>

          <Triangles />

          {success && (
            <Alert variant="success">Listing created sucessfully</Alert>
          )}
          <div
            className="row justify-content-center"
            style={{
              marginLeft: "20%",
              marginRight: "20%",
              marginTop: "3%",
              height: "500px",
            }}
          >
            <Carousel activeIndex={index} onSelect={handleSelect}>
              {[...Array(formData.images.length)].map((url, i) => (
                <Carousel.Item key={i} interval={null}>
                  <div className="d-flex justify-content-center">
                    <img
                      src={formData.images[i]}
                      alt="Listing image"
                      style={{ height: "500px", width: "800px" }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger text-center"
                      onClick={() => handleRemoveImage(index)}
                      style={{
                        position: "absolute",
                        marginRight: "-60%",
                        marginTop: "2%",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
            <span className="error">{error.images}</span>
          </div>

          <div
            className="row text-center justify-content-center"
            style={{
              marginBottom: "1%",
              marginTop: "1%",
              marginLeft: "25%",
              marginRight: "25%",
            }}
          >
            <input
              multiple
              type="file"
              onChange={(e) => setFiles(e.target.files)}
            />

            <button
              type="button"
              onClick={handleImageSubmit}
              className="btn btn-primary loginSubmit"
            >
              Upload
            </button>
          </div>
          <div className="row text-center">
            <p className="text-danger">
              {imageUploadError && imageUploadError}
            </p>
          </div>
          <div
            className="row"
            style={{ marginLeft: "10%", marginRight: "10%", marginTop: "1%" }}
          >
            <hr className="tophr" />
          </div>
          <div
            className="formcontainer"
            style={{ marginLeft: "10%", marginRight: "10%" }}
          >
            <form
              name="createListingForm"
              style={{ paddingTop: "3%", paddingBottom: "0" }}
              onSubmit={handleSubmit}
            >
              <div className="row" style={{ marginBottom: "1%" }}>
                <div className="col-lg-4">
                  {" "}
                  <h1 className="text-start font-weight-bold">
                    Property Name:{" "}
                  </h1>{" "}
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    onKeyDown={(event) =>
                      event.key === "Enter" && event.preventDefault()
                    }
                  ></input>
                </div>
              </div>

              <div className="row" style={{ marginBottom: "0%" }}>
                <div className="col-lg-4">
                  {" "}
                  <h1 className="text-start font-weight-bold">
                    Zip code:{" "}
                  </h1>{" "}
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Zip code"
                    name="postalCode"
                    value={formData.postalCode === 0 ? "" : formData.postalCode}
                    onChange={handleChange}
                    required
                    onKeyDown={(event) =>
                      (event.key === "Enter" || event.key === " ") &&
                      event.preventDefault()
                    }
                  ></input>
                </div>
              </div>
              <span
                className="error"
                style={{ marginLeft: "35%", marginBottom: "3%" }}
              >
                {error.postalCode}
              </span>

              <div className="row" style={{ marginBottom: "3%" }}>
                <div className="col-lg-4">
                  {" "}
                  <h1 className="text-start font-weight-bold">
                    Description:{" "}
                  </h1>{" "}
                </div>
                <div className="col">
                  <textarea
                    className="form-control"
                    placeholder="Property Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    onKeyDown={(event) =>
                      event.key === "Enter" && event.preventDefault()
                    }
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      fontSize: "150%",
                    }}
                  ></textarea>
                </div>
              </div>

              <div className="row gap-5" style={{ marginBottom: "3%" }}>
                <div className="col-sm-2 text-center">
                  <h1 className="text-start font-weight-bold">Bathrooms: </h1>
                </div>
                <div className="col-sm-1 ml-0">
                  <input
                    className="form-control"
                    type="number"
                    name="bathroom"
                    value={formData.bathroom === 0 ? "" : formData.bathroom}
                    onChange={handleChange}
                    onScroll={(event) => {
                      event.preventDefault();
                    }}
                    required
                    min="0"
                    onWheel={(event) => {
                      event.preventDefault();
                    }}
                  />
                </div>
                <div className="col-sm-2 text-center">
                  <h1 className="text-start font-weight-bold">Bedrooms: </h1>
                </div>
                <div className="col-sm-1 ml-0">
                  <input
                    className="form-control"
                    type="number"
                    name="bedroom"
                    value={formData.bedroom === 0 ? "" : formData.bedroom}
                    onChange={handleChange}
                    onScroll={(event) => {
                      event.preventDefault();
                    }}
                    required
                    min="0"
                    onWheel={(event) => {
                      event.preventDefault();
                    }}
                  />
                </div>
                <div className="col-sm-2 text-center">
                  <h1 className="text-start font-weight-bold">
                    Monthly Rent:{" "}
                  </h1>
                </div>
                <div className="col-sm-2 ml-0" style={{ marginLeft: "-2%" }}>
                  <div className="input-group mb-0">
                    <span className="input-group-text" id="basic-addon1">
                      SGD
                    </span>
                    <input
                      className="form-control"
                      type="number"
                      name="price"
                      value={formData.price === 0 ? "" : formData.price}
                      onChange={handleChange}
                      onScroll={(event) => {
                        event.preventDefault();
                      }}
                      required
                      min="0"
                      onWheel={(event) => {
                        event.preventDefault();
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                className="row overflow-visible"
                style={{
                  marginLeft: "-5%",
                  marginRight: "-5%",
                  marginTop: "3%",
                  marginBottom: "3%",
                }}
              >
                <hr className="tophr" />
              </div>
              <div
                className="row justify-content-center"
                style={{ marginBottom: "1%" }}
              >
                <button type="submit" className="btn btn-primary loginSubmit">
                  Create Listing
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "15em" }}>Error 403</h1>
          <p style={{ fontSize: "3em" }}>
            You don't have permission to access this page.
          </p>
        </div>
      )}
    </>
  );
}

export default CreateListingForm;
