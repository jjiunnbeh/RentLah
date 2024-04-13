import NavBar from "../components/NavBar";
import Triangles from "../components/Triangles";
import "../styles/ListingDetails.css";
import { Carousel } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Map, Marker } from "react-map-gl/maplibre";
import whatsapp from "../assets/whatsapp.png";
import "maplibre-gl/dist/maplibre-gl.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
  } from "../redux/user/userSlice";
  import Alert from 'react-bootstrap/Alert';

function ListingDetails() {
  const userType = useSelector((state) => state.user.currentUser.userType);
  console.log(userType);
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const BASE_URL = "http://localhost:3000";
  const [listing, setListing] = useState({});
  const [agent, setAgent] = useState({});
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [notIn, setNotIn] = useState(true);
  const handleAddtoWatchList = (listingID) => async (event) =>
  {
    event.preventDefault();
    dispatch(updateUserStart());
    try
    {
        const response = await axios.put(`${BASE_URL}/api/user/add-to-watchlist/${listingID}`, {username: currentUser.username});
        if (response.status == 200)
        {
          console.log("Added to watchlist")
            dispatch(updateUserSuccess(response.data.rest));
            console.log(response.data.rest);
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 2000);

        }

    }catch(error)
    {
        console.log(error.response.data.message);
        const e = error.response.data.message;
        if (e.type == "watchlist")
        {
          setSuccess(true);
          setNotIn(false);
          setTimeout(() => {
            setSuccess(false);
            setNotIn(true);
          }, 2000);
        }
    }
  }


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


  console.log(listing);
  console.log(listing.agentRef);
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
        <NavBar userType={userType}/>
      </header>

      <Triangles />
      {success && (
            <Alert  variant={notIn ? "success" : 'primary'} >
              {notIn ? "Property added to Watchlist." : "Property already in your watchlist."}
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
                    style={{ height: "700px", width: "800px" }}
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        </div>

        <div
          className="card text-white"
          id="detailcard"
          style={{ width: "30%", height: "700px", marginRight: "12%", background:"rgb(30,61,99)", overflow:"auto"}}
        >
          <div className="card-body">
            <h1 className="Card Title" > {listing.name} </h1>

            <ul className="list-group list-group-flush">
              <li className="list-group-item ">
                <h3 className="card-text"> Description: <br></br>{listing.description}</h3>
                <hr className="cardhr"></hr>
                <h2 className="card-text" style={{ whiteSpace: "pre-line"}}>
                  {" "}
                  {listing.address}{" "}
                </h2>
                {/* <h2> {listing.postalCode} </h2> */}
              </li>
            </ul>

            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <hr className="cardhr"></hr>
                <h2 style={{ whiteSpace: "pre-line"}}> Monthly Rent: <br></br>
                SGD {listing.price} </h2>
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
                    <h1 style={{ fontSize: "5rem" }}> {listing.bathroom}</h1>
                    <h1> Bathrooms </h1>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row mt-3" style={{ marginLeft: "11.5%", maxHeight: "700", marginBottom:"1%"}}>
        <div className="col" id="map" style={{ width:"970px" }}>
          {listing && listing.LATITUDE && listing.LONGITUDE && (
            <Map
              initialViewState={{
                latitude: listing.LATITUDE,
                longitude: listing.LONGITUDE,
                zoom: 15,
              }}
              container="map"
              maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
              mapStyle="https://www.onemap.gov.sg/maps/json/raster/mbstyle/Default.json"
              attributionControl={false}
              style={{ height: "350px", width: "109%" }}
            >
              <Marker
                latitude={listing.LATITUDE}
                longitude={listing.LONGITUDE}
              />
            </Map>
          )}
        </div>

        <div className="col" style={{marginLeft:"4%"}}>
          <div className="card text-white" id="agentcard" style={{ width:"72%" ,background:"rgb(62, 94, 133)", paddingBottom: "1.5%"}}>
            <div className="card-body">
              <h2 className="card-title">{agent.agentname}</h2>
              <h4 className="card-text" style={{ whiteSpace: "pre-line" }}>
                {`Agent Registration Number: ${agent.agentregnum}\nAgent Contact Number: ${agent.phoneNo}`}
              </h4>
            </div>
            <div className="card-body">
              
              <button className="btn"
             onClick={() => {
              const url = `https://api.whatsapp.com/send/?phone=65${agent.phoneNo}&text=&type=phone_number&app_absent=0`;
              window.open(url, '_blank');
            }}
                target="_blank"
                style={{background:"silver"}}
              >
                  <h5 style={{color:"black"}}>Contact by <img src={whatsapp} alt="Whatsapp" style={{ height: "2em" }}/></h5>
              </button>
                      {
                  userType==='Customer' && (
                      <div className="row " style={{marginTop:"8%"}}>
                        <button type="button" className="btn btn-link Listing"
                        style={{fontSize:"30px", color:"white"}} onClick={handleAddtoWatchList(listing._id)}>Add to Watchlist</button>
                      
                </div>
                     )
                }
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
