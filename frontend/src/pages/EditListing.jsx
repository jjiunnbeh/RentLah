import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import Triangles from "../components/Triangles";
import "../styles/ListingDetails.css";
import { Carousel } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../styles/ProfileForm.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function EditListing() {
  const currentAgent = useSelector((state) => state.user.currentUser.username);
  const userType = useSelector((state) => state.user.currentUser.userType);
  const [index, setindex] = useState(0);
  const [green, setGreen] = useState(true);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);
  const BASE_URL = "http://localhost:3000";
  const navigate = useNavigate();
  const [error, setError] = useState({ postalCode: "" });
  const [listing, setListing] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    postalCode: 0,
    description: "",
    bathroom: 0,
    bedroom: 0,
    price: 0,
  });

  const { id } = useParams();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/listing/get-listing/${id}`
        );
        setListing(response.data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };
    fetchListing();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({ postalCode: "" });
    try {
      const response = await axios.put(
        `${BASE_URL}/api/listing/edit-listing/${id}`,
        formData
      );
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      const e = error.response.data.message;
      if (e.type == "postalcode") {
        setError({ postalCode: e.content });
      }
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteConfirmation = (event) => {
    event.preventDefault();
    setShow(true);
  };
  const handleClose = (event) => {
    event.preventDefault();
    setShow(false);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    setShow(false);
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/listing/delete-listing/${listing._id}`
      );
      if (response.status == 200) {
        setGreen(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/my-listings");
        }, 1000);
      }
    } catch (error) {
      const e = error.response.data.message;
      console.log(e);
    }
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
            <Alert variant={green ? "success" : "danger"}>
              {green
                ? "Listing edited sucessfully"
                : "Listing deleted successfully"}
            </Alert>
          )}
          <div
            className="formcontainer"
            style={{
              marginLeft: "10%",
              marginRight: "10%",
              marginTop: "5%",
              overflow: "hidden",
            }}
          >
            <form
              name="createListingForm"
              style={{ paddingTop: "3%", paddingBottom: "0" }}
              onSubmit={handleSubmit}
            >
              <div className="row mb-0" style={{ marginBottom: "3%" }}>
                <div className="col">
                  {" "}
                  <h1 className="text-center font-weight-bold">
                    Property Name: {listing.name}{" "}
                  </h1>{" "}
                </div>
              </div>

              <div className="row mt-0">
                <div className="col">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onKeyDown={(event) =>
                      event.key === "Enter" && event.preventDefault()
                    }
                  ></input>
                </div>
              </div>

              <div
                className="row"
                style={{
                  marginLeft: "-10%",
                  marginRight: "-10%",
                  marginTop: "2%",
                }}
              >
                <hr className="tophr" />
              </div>

              <div
                className="row"
                style={{ marginTop: "3%", marginBottom: "3%" }}
              >
                <div className="col-lg-4">
                  {" "}
                  <h1 className="text-start font-weight-bold">
                    Zip code: {listing.postalCode}
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
                    onKeyDown={(event) =>
                      (event.key === "Enter" || event.key === " ") &&
                      event.preventDefault()
                    }
                  ></input>
                </div>
              </div>
              <span className="error">{error.postalCode}</span>

              <div className="row" style={{ marginBottom: "3%" }}>
                <div className="col-lg-4">
                  {" "}
                  <h1 className="text-start font-weight-bold">
                    Description:{" "}
                  </h1>{" "}
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Property Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onKeyDown={(event) =>
                      event.key === "Enter" && event.preventDefault()
                    }
                  ></input>
                </div>
              </div>

              <div className="row gap-5" style={{ marginBottom: "3%" }}>
                <div className="col-sm-2 text-center">
                  <h2 className="text-start font-weight-bold">
                    Bathrooms: {listing.bathroom}
                  </h2>
                </div>
                <div className="col-sm-1 ml-0" style={{ marginTop: "2%" }}>
                  <input
                    className="form-control"
                    type="number"
                    name="bathroom"
                    value={formData.bathroom === 0 ? "" : formData.bathroom}
                    onChange={handleChange}
                    onScroll={(event) => {
                      event.preventDefault();
                    }}
                    min="0"
                    onWheel={(event) => {
                      event.preventDefault();
                    }}
                  />
                </div>
                <div className="col-sm-2 text-center">
                  <h2 className="text-start font-weight-bold">
                    Bedrooms: {listing.bedroom}
                  </h2>
                </div>
                <div className="col-sm-1 ml-0" style={{ marginTop: "2%" }}>
                  <input
                    className="form-control"
                    type="number"
                    name="bedroom"
                    value={formData.bedroom === 0 ? "" : formData.bedroom}
                    onChange={handleChange}
                    onScroll={(event) => {
                      event.preventDefault();
                    }}
                    min="0"
                    onWheel={(event) => {
                      event.preventDefault();
                    }}
                  />
                </div>
                <div className="col-sm-2 text-center">
                  <h2 className="text-start font-weight-bold">
                    Monthly Rent: {listing.price}
                  </h2>
                </div>
                <div
                  className="col-sm-2 ml-0"
                  style={{ marginLeft: "-2%", marginTop: "2%" }}
                >
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
                <div className="col text-end">
                  <button type="submit" className="btn btn-primary loginSubmit">
                    Submit Edit
                  </button>
                </div>

                <div className="col">
                  <button
                    className="btn btn-primary loginSubmit"
                    style={{ background: "Gray" }}
                    onClick={handleDeleteConfirmation}
                  >
                    Delete Listing
                  </button>
                  <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header
                      closeButton
                      onClick={handleClose}
                      style={{ backgroundColor: "white" }}
                    >
                      <Modal.Title
                        style={{ backgroundColor: "white" }}
                      >{`Are you sure you want to delete ${listing.name}?`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                      style={{ backgroundColor: "white", fontWeight: "bold" }}
                    >
                      This delete is permanent and cannot be undone.
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: "white" }}>
                      <Button variant="secondary" onClick={handleClose}>
                        No
                      </Button>
                      <Button variant="primary" onClick={handleDelete}>
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
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

export default EditListing;
