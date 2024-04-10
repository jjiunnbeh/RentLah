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

function Home() {
  const userType = useSelector((state) => state.user.currentUser.userType);
  console.log(userType);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [listings, setListings] = useState([]);
  const dispatch = useDispatch();
  const BASE_URL = "http://localhost:3000";
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
            dispatch(updateUserSuccess(response.data.rest));
            console.log(response.data.rest);
        }

    }catch(error)
    {
        console.log(error.response.data.message);
    }
  }

  
  

  return (
    <>
      <header>
        <NavBar userType={userType} />
      </header>

      <Triangles />

      <div className="row text-center" style={{ marginTop: "3%" }}>
        <h1> Hello {currentUser.username} </h1>
      </div>

      <div className="row text-center" style={{ marginTop: "6%" }}>
        <h2> Listings</h2>
      </div>

      <div
        className="col overflow-auto"
        id="Listingsbar"
        style={{ marginTop: "1%", width: "100%" }}
      >
        <div
          className="row d-flex gap-4 flex-nowrap"
          style={{ marginLeft: "6%" }}
        >
          {listings.slice(0, 10).map((listing) => (
            
            
            <div className="Listingcontainer" key={listing._id}>
              <a href={"/listing/"+listing._id} style={{textDecoration: "none"}}>
              <div
                className="col-mx-auto d-grid gap-4"
                style={{ width: "525px" }}
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
                  style={{ marginTop: "20px", width: "525px" }}
                >
                  <h1 className="text-truncate"> Address: {listing.address}</h1>
                </div>
                <div className="row">
                  <h1> Pricing: {listing.price}</h1>
                </div>
                <div className="row">
                  <h1>{listing.bathroom}🛁 {listing.bedroom}🛏️</h1>
                </div>
                <div className="row">
                  {/* { <a className="Listing" href={"/listing/"+listing._id} style={{fontSize:"25px"} }>
                    {" "}
                    Learn more...{" "}
                  </a> } */}
                </div>

                {
                  userType==='Customer' && (
                <div className="row">
                  <a className="Listing" onClick={handleAddtoWatchList(listing._id)} style={{fontSize:"30px"} } >
                    {" "}
                    Add to watchlist...{" "}
                  </a>
                </div>
                     )
                } 
              </div>
              </a>
            </div>
          ))}
          <div className="col" style={{ minWidth: "5%" }} />
        </div>
      </div>
    </>
  );
}
export default Home;

/*    <div>
        <NavBar />
            <div className="main-content">
                <h1>Welcome to RentLah!</h1>
                <p>A one-stop platform for renting properties in Singapore!</p>
            </div>
        </div>
*/
