import NavBar from "../components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import Triangles from "../components/Triangles";
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Home.css";
import {
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
  } from "../redux/user/userSlice";
  import {useNavigate} from "react-router-dom";
  import Alert from 'react-bootstrap/Alert';
  function Home() {
    const userType = useSelector((state) => state.user.currentUser.userType);
    console.log(userType);
    const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [listings, setListings] = useState([]);
  const dispatch = useDispatch();
  const BASE_URL = "http://localhost:3000";
  const [success, setSuccess] = useState(false);
  const [notIn, setNotIn] = useState(true);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/listing/get-listings`
        );
        const list = response.data;
        const shuffledListings = list.sort(() => Math.random() - 0.5);
        setListings(shuffledListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    fetchListings();
  }, []);

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


  
  return (
    <>
      <header>
        <NavBar userType={userType} />
      </header>

      <Triangles />
      {success && (
            <Alert  variant={notIn ? "success" : 'primary'} >
              {notIn ? "Property added to Watchlist." : "Property already in your watchlist."}
            </Alert>
          )}

      <div className="row text-center" style={{ marginTop: "3%" }}>
        <h1 style={{fontSize:"3rem"}}> Welcome, {currentUser.username} </h1>
      </div>

      <div className="row text-center" style={{ marginTop: "6%" }}>
        <h2 style={{fontSize:"2rem"}}>Properties</h2>
      </div>

      <div
        className="col overflow-auto"
        id="Listingsbar"
        style={{ marginTop: "3%", width: "100%" }}
      >
        <div
          className="row d-flex gap-4 flex-nowrap"
          style={{ marginLeft: "6%" }}
        >
          {listings.slice(0, 10).map((listing) => (
            
            
            <div className="Listingcontainer" key={listing._id}  onClick={(e) => {
              if (!e.target.classList.contains('btn-link')) {
                navigate("/listing/" + listing._id);
              }
            }}>
              
              <div
                className="col-mx-auto d-grid gap-4"
                style={{ width: "300px" }}
              >
                <div className="row justify-content-center">
                  <div className="Listingimg">
                    {listing.images.length > 0 && (
                      <img src={listing.images[1]} alt="Listing image" className="img" style={{borderRadius: "25px", width:"100%", marginLeft:"0", height:"100%"}}/>
                    )}
                  </div>
                </div>

                <div
                  className="row"
                  style={{ marginTop: "20px", width: "315px" }}
                >
                  <h3 className="text-truncate"> Address: {listing.address}</h3>
                </div>
                <div className="row">
                  <h3> Pricing: {listing.price}</h3>
                </div>
                <div className="row">
                  <h3>{listing.bathroom}🛁 {listing.bedroom}🛏️</h3>
                </div>

                {
                  userType==='Customer' && (
                <div className="row">
                  <button type="button" className="btn btn-link Listing"
                   style={{fontSize:"25px"}} onClick={handleAddtoWatchList(listing._id)}>Add to Watchlist</button>
                 
                    
                </div>
                     )
                } 
              </div>
              
            </div>
          ))}
          <div className="col" style={{marginLeft:"4%"}}/>
        </div>
      </div>
    </>
  );
}
export default Home;

