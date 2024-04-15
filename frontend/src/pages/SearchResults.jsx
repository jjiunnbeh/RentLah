import React, { useState, useEffect } from "react";
import Triangles from "../components/Triangles";
import NavBar from "../components/NavBar";
import "../styles/SearchResults.css";
import PaginationComponent from "../components/PageNavigator";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Alert from "react-bootstrap/Alert";

//import { fetchPropertyListings } from './propertyListings'; // Import the fetchPropertyListings function from your backend API file

// const PropertyListings = ({ listings }) => {
//     return (
//         <div>
//             <h2>Available Property Listings</h2>
//             <ul>
//                 {listings.map((listing, index) => (
//                     <li key={index}>
//                         <p>{listing.address}</p>
//                         <p>{listing.price}</p>
//                         {/* all property details go here*/}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

const SearchBar = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    searchTerm: "",
    bedroom: 0,
    bathroom: 0,
    lowerPrice: 0,
    upperPrice: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (form.searchTerm) {
      if (
        form.bedroom > 0 &&
        form.bathroom > 0 &&
        form.lowerPrice > 0 &&
        form.upperPrice > 0
      ) {
        navigate(
          `/search/${form.searchTerm}/${form.bedroom}/${form.bathroom}/${form.lowerPrice}/${form.upperPrice}`
        );
      } else {
        navigate(`/search/${form.searchTerm}`);
      }
    }
    if (form.searchTerm == "") {
      if (
        form.bedroom > 0 &&
        form.bathroom > 0 &&
        form.lowerPrice > 0 &&
        form.upperPrice > 0
      ) {
        navigate(
          `/search/all/${form.bedroom}/${form.bathroom}/${form.lowerPrice}/${form.upperPrice}`
        );
      } else {
        navigate(`/search/all`);
      }
    }
  };

  const handleEnter = (event) => {
    if (event.key == "Enter") {
      if (form.searchTerm) {
        if (
          form.bedroom > 0 &&
          form.bathroom > 0 &&
          form.lowerPrice > 0 &&
          form.upperPrice > 0
        ) {
          navigate(
            `/search/${form.searchTerm}/${form.bedroom}/${form.bathroom}/${form.lowerPrice}/${form.upperPrice}`
          );
        } else {
          navigate(`/search/${form.searchTerm}`);
        }
      }
    }
  };

  return (
    <>
      <div className="row">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            value={form.searchTerm}
            onChange={handleChange}
            name="searchTerm"
            onKeyDown={handleEnter}
          />
          <button
            className="btn btn-dark"
            style={{ fontSize: "25px" }}
            type="submit"
            onClick={handleSearch}
          >
            🔍
          </button>
        </div>
      </div>
      <Dropdown autoClose={false} drop="start" style={{ marginLeft: "86%" }}>
        <Dropdown.Toggle
          variant="link"
          id="dropdown-basic"
          align="start"
          style={{ fontSize: "20px" }}
        >
          Filter
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ background: "silver" }}>
          <form className="px-0 py-1">
            <div className="row justify-content-center">
              <div className="form-group col-md-3">
                <label htmlFor="inputbedroom" style={{ fontSize: "20px" }}>
                  Bedroom
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputbedroom"
                  style={{ fontSize: "20px" }}
                  value={form.bedroom}
                  name="bedroom"
                  min="0"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3" />
              <div className="form-group col-md-3">
                <label htmlFor="inputbathroom" style={{ fontSize: "20px" }}>
                  Bathroom
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputbathroom"
                  style={{ fontSize: "20px" }}
                  name="bathroom"
                  value={form.bathroom}
                  min="0"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row justify-content-center mt-2">
              <div className="form-group col-md-3">
                <input
                  type="number"
                  className="form-control"
                  id="minprice"
                  style={{ fontSize: "20px" }}
                  name="lowerPrice"
                  value={form.lowerPrice}
                  min="0"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-md-3 text-center mt-1">
                <h5>
                  &lt; &nbsp; &nbsp; &nbsp; Price &nbsp; &nbsp; &nbsp; &gt;
                </h5>
              </div>
              <div className="form-group col-md-3">
                <input
                  type="number"
                  className="form-control"
                  id="maxprice"
                  style={{ fontSize: "20px" }}
                  name="upperPrice"
                  value={form.upperPrice}
                  min="0"
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

const SearchResults = () => {
  const [propertyListings, setPropertyListings] = useState([]);
  const userType = useSelector((state) => state.user.currentUser.userType);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { searchTerm, bedroom, bathroom, lowerPrice, upperPrice } = useParams();
  const [success, setSuccess] = useState(false);
  const [notIn, setNotIn] = useState(true);
  const BASE_URL = "http://localhost:3000";
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
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
        }, 1000);
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
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPropertyListings([]);
        let searchQuery = "";
        if (searchTerm) {
          if (bedroom && bathroom && lowerPrice && upperPrice) {
            searchQuery = `search/${searchTerm}/${bedroom}/${bathroom}/${lowerPrice}/${upperPrice}`;
          } else {
            searchQuery = `search/${searchTerm}`;
          }
        }
        // Fetch property listings based on the constructed search query
        const listings = await axios.get(
          `${BASE_URL}/api/listing/${searchQuery}`
        );
        console.log(listings.data);
        setPropertyListings(listings.data);
        setCurrentPage(1);
      } catch (error) {
        const e = error.response.data.message;
        if (e.message == "No property found") {
          setPropertyListings([]);
        }
        console.error(error);
      }
    };

    fetchData();
  }, [searchTerm, bedroom, bathroom, lowerPrice, upperPrice]);

  return (
    <>
      <header>
        <NavBar userType={userType} />
      </header>
      <Triangles />

      {success && (
        <Alert variant={notIn ? "success" : "warning"}>
          {notIn
            ? "Property added to Watchlist."
            : "Property already in your watchlist."}
        </Alert>
      )}

      <div className="col justify-content-center">
        <div
          className="row"
          style={{ marginLeft: "30%", marginRight: "30%", marginTop: "5%" }}
        >
          <SearchBar />
        </div>
      </div>

      <div
        className="d-grid gap-3"
        style={{ marginTop: "3%", marginLeft: "17%", marginRight: "17%" }}
      >
        {propertyListings.length > 0 &&
          propertyListings
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((listing) => (
              <div className="row" key={listing._id}>
                <div className="col-sm-auto">
                  <div className="img-div">
                    {listing.images.length > 0 && (
                      <img
                        src={listing.images[0]}
                        style={{ borderRadius: "18px" }}
                        onClick={() => {
                          navigate("/listing/" + listing._id);
                        }}
                      ></img>
                    )}
                  </div>
                </div>

                <div className="col d-grid mt-2 gap-2">
                  <div className="row" style={{ width: "545px" }}>
                    <h2 className="text-truncate"> {listing.name} </h2>
                  </div>
                  <div className="row" style={{ width: "545px" }}>
                    <h2 className="text-truncate">
                      {" "}
                      Address: {listing.address}{" "}
                    </h2>
                  </div>
                  <div className="row" style={{ width: "545px" }}>
                    <h2> Price: S${listing.price} </h2>
                  </div>
                </div>

                <div className="col d-grid align-self-end gap-2">
                  <div className="row " style={{ marginTop: "3.5%" }}>
                    <button
                      type="button"
                      className="btn btn-secondary Listing"
                      style={{
                        color: "black",
                        backgroundColor: "transparent",
                        marginLeft: "50%",
                        width: "50%",
                        height: "2.3em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "25px",
                        marginBottom: "-3%",
                        ...(userType === "Agent" && { marginTop: "-23%" }),
                      }}
                      onClick={(e) => {
                        navigate(`/listing/${listing._id}`);
                      }}
                    >
                      Learn More
                    </button>
                  </div>

                  {userType === "Customer" && (
                    <div className="row " style={{ marginTop: "3.5%" }}>
                      <button
                        type="button"
                        className="btn btn-secondary Listing"
                        style={{
                          color: "black",
                          width: "50%",
                          backgroundColor: "transparent",
                          marginLeft: "50%",
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
            ))}
      </div>

      <div
        className="row justify-content-center"
        style={{ marginBottom: "3%", marginTop: "3%" }}
      >
        <div className="col-4 d-flex justify-content-center">
          {propertyListings.length > 0 && (
            <PaginationComponent
              itemsCount={propertyListings.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
