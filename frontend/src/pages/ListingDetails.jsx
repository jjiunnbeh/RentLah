import NavBar from "../components/NavBar";
import Triangles from "../components/Triangles";
import "../styles/ListingDetails.css";
import { Carousel } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Map, Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import Alert from "react-bootstrap/Alert";

function ListingDetails() {
  const userType = useSelector((state) => state.user.currentUser.userType);
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const BASE_URL = "http://localhost:3000";
  const [listing, setListing] = useState({});
  const [agent, setAgent] = useState({});
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [notIn, setNotIn] = useState(true);
  const handleAddtoWatchList = (listingID) => async (event) => {
    event.preventDefault();
    dispatch(updateUserStart());
    try {
      const response = await axios.put(
        `${BASE_URL}/api/user/add-to-watchlist/${listingID}`,
        { username: currentUser.username }
      );
      if (response.status == 200) {
        console.log("Added to watchlist");
        dispatch(updateUserSuccess(response.data.rest));
        console.log(response.data.rest);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error.response.data.message);
      const e = error.response.data.message;
      if (e.type == "watchlist") {
        setSuccess(true);
        setNotIn(false);
        setTimeout(() => {
          setSuccess(false);
          setNotIn(true);
        }, 2000);
      }
    }
  };

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

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/user/get-agent/${listing.agentRef}`
        );
        console.log(response.data);
        setAgent(response.data);
      } catch (error) {
        console.error("Error fetching agent information:", error);
      }
    };
    fetchAgent();
  }, [listing]);

  const [index, setindex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setindex(selectedIndex);
  };

  const flyTo = (coordinates) => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    map.flyTo({
      center: coordinates,
      essential: true,
      zoom: 14,
    });
  };

  return (
    <>
      {listing && agent && (
        <>
          <header>
            <NavBar userType={userType} />
          </header>

          <Triangles />
          {success && (
            <Alert variant={notIn ? "success" : "primary"}>
              {notIn
                ? "Property added to Watchlist."
                : "Property already in your watchlist."}
            </Alert>
          )}

          <div className="row">
            <div className="col mt-3 " style={{ marginLeft: "12%" }}>
              <Carousel activeIndex={index} onSelect={handleSelect}>
                {listing.images &&
                  listing.images.map((image, i) => (
                    <Carousel.Item key={i}>
                      <img
                        className="d-block w-100"
                        src={image}
                        alt={`Image ${i + 1}`}
                        style={{ height: "695px", width: "800px" }}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div
              className="card text-white"
              id="detailcard"
              style={{
                width: "30%",
                height: "698px",
                marginRight: "12%",
                background: "rgb(30,61,99)",
                overflow: "auto",
                marginTop: "0.55%",
              }}
            >
              <div className="card-body">
                <h1 className="Card Title"> {listing.name} </h1>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item ">
                    <h3 className="card-text">
                      {" "}
                      Description: <br></br>
                      {listing.description}
                    </h3>
                    <hr className="cardhr"></hr>
                    <h2
                      className="card-text"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {" "}
                      {listing.address}{" "}
                    </h2>
                  </li>
                </ul>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <hr className="cardhr"></hr>
                    <h2 style={{ whiteSpace: "pre-line" }}>
                      {" "}
                      Monthly Rent: <br></br>
                      SGD {listing.price}{" "}
                    </h2>
                  </li>
                </ul>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <hr className="cardhr"></hr>
                    <div className="row">
                      <div className="col text-center">
                        <h1 style={{ fontSize: "5rem" }}> {listing.bedroom}</h1>
                        <h1> Bedrooms </h1>
                      </div>
                      <div className="col text-center">
                        <h1 style={{ fontSize: "5rem" }}>
                          {" "}
                          {listing.bathroom}
                        </h1>
                        <h1> Bathrooms </h1>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className="row mt-3"
            style={{
              marginLeft: "11.5%",
              maxHeight: "700",
              marginBottom: "1%",
            }}
          >
            <div className="col" id="map" style={{ width: "970px" }}>
              {listing && listing.LATITUDE && listing.LONGITUDE && (
                <Map
                  initialViewState={{
                    latitude: listing.LATITUDE,
                    longitude: listing.LONGITUDE,
                    zoom: 16,
                  }}
                  container="map"
                  maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
                  mapStyle="https://www.onemap.gov.sg/maps/json/raster/mbstyle/Default.json"
                  attributionControl={false}
                  style={{
                    height: "368px",
                    width: "109.3%",
                    borderRadius: "10px",
                  }}
                >
                  <Marker
                    latitude={listing.LATITUDE}
                    longitude={listing.LONGITUDE}
                  />
                </Map>
              )}
            </div>

            <div className="col" style={{ marginLeft: "3.8%" }}>
              <div
                className="card text-white"
                id="agentcard"
                style={{
                  width: "72%",
                  background: "rgb(62, 94, 133)",
                  paddingBottom: "0",
                }}
              >
                <div className="card-body">
                  <h2 className="card-title">{agent.agentname}</h2>
                  <h3
                    className="card-text"
                    style={{ whiteSpace: "pre-line", marginTop: "3%" }}
                  >
                    {`Agent Registration Number:\u00A0 ${agent.agentregnum}\n\nAgent Contact Number: \u00A0(65)\u00A0${agent.phoneNo}`}
                  </h3>
                </div>
                <div className="card-body">
                  <button
                    className="btn"
                    onClick={() => {
                      const url = `https://api.whatsapp.com/send/?phone=65${agent.phoneNo}&text=&type=phone_number&app_absent=0`;
                      window.open(url, "_blank");
                    }}
                    style={{
                      background: "silver",
                      width: "100%",
                      height: "3.5em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "none",
                      ...(userType === "Agent" && {
                        marginBottom: "8.5%",
                        marginTop: "8%",
                      }),
                    }}
                  >
                    <h5
                      style={{
                        color: "black",
                        margin: 0,
                        fontSize: "1.6rem",
                        width: "100%",
                        marginTop: "0.5%",
                      }}
                    >
                      Contact Using{" "}
                      <img
                        src="https://static.whatsapp.net/rsrc.php/v3/y7/r/DSxOAUB0raA.png"
                        alt="WhatsApp"
                        style={{
                          filter:
                            "saturate(900%) sepia(100%) hue-rotate(160deg) brightness(50%)",
                          height: "1.5em",
                          marginLeft: "0.4em",
                          marginBottom: "0.2em",
                        }}
                      />
                    </h5>
                  </button>

                  {userType === "Customer" && (
                    <div className="row " style={{ marginTop: "3.5%" }}>
                      <button
                        type="button"
                        className="btn btn-secondary Listing"
                        style={{
                          color: "white",
                          backgroundColor: "transparent",
                          width: "100%",
                          height: "2.3em",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "25px",
                        }}
                        onClick={handleAddtoWatchList(listing._id)}
                      >
                        ♡ Add to Watchlist
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <footer className="text-end">
            <img
              src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png"
              style={{ height: "20px", width: "20px" }}
            />
            &nbsp;
            <a
              href="https://www.onemap.gov.sg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OneMap
            </a>
            &nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;
            <a
              href="https://www.sla.gov.sg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Singapore Land Authority
            </a>
          </footer>
        </>
      )}
    </>
  );
}

export default ListingDetails;
