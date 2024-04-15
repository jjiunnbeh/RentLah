import React, { useState, useEffect } from "react";
import Triangles from "../components/Triangles";
import NavBar from "../components/NavBar";
import "../styles/SearchResults.css";
import PaginationComponent from "../components/PageNavigator";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AgentListings = () => {
  const BASE_URL = "http://localhost:3000";
  const [propertyListings, setPropertyListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const userType = useSelector((state) => state.user.currentUser.userType);
  const username = useSelector((state) => state.user.currentUser.username);
  const itemsPerPage = 10;
  useEffect(() => {
    const fetchAgentListings = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/listing/get-managed-listings`,
          {
            params: { username: username },
          }
        );
        const listings = response.data;
        setPropertyListings(listings);
        setCurrentPage(1);
        console.log(listings);
      } catch (error) {
        console.error("Error fetching agent listings:", error);
      }
    };

    fetchAgentListings();
  }, []);

  return (
    <>
      {userType === "Agent" ? (
        <>
          <header>
            <NavBar userType={userType} />
          </header>
          <Triangles />

          <div
            className="col"
            style={{ marginLeft: "30%", marginRight: "30%", marginTop: "0%" }}
          >
            <div className="row text-center">
              <h1>My Listings</h1>
            </div>
            <div
              className="row justify-content-end"
              style={{ marginLeft: "90%", marginRight: "-30%" }}
            >
              <button
                className="btn btn-primary btn"
                style={{ backgroundColor: "rgb(62, 94, 133)" }}
                onClick={() => {
                  navigate("/create-listing");
                }}
              >
                Create Listing
              </button>
            </div>
          </div>

          <div
            className="d-grid gap-3"
            style={{ marginTop: "0%", marginLeft: "17%", marginRight: "17%" }}
          >
            {propertyListings.length > 0 &&
              propertyListings
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((listing) => (
                  <div className="row" key={listing._id}>
                    <div className="col-sm-auto">
                      <div className="img-div">
                        <img
                          src={listing.images[0]}
                          onClick={() => {
                            navigate("/listing/" + listing._id);
                          }}
                          style={{ borderRadius: "18px" }}
                        ></img>
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
                        <h2> ${listing.price} </h2>
                      </div>
                    </div>

                    <div className="col d-grid align-self-end gap-2">
                      <div className="row ">
                        <button
                          type="button"
                          className="btn btn-secondary Listing"
                          style={{
                            color: "black",
                            backgroundColor: "transparent",
                            marginLeft: "55%",
                            width: "45%",
                            height: "2.3em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "25px",
                            marginTop: "-20%",
                          }}
                          onClick={(e) => {
                            navigate(`/listing/${listing._id}`);
                          }}
                        >
                          Learn More
                        </button>
                      </div>
                      <div className="row ">
                        <button
                          type="button"
                          className="btn btn-secondary Listing"
                          style={{
                            color: "black",
                            backgroundColor: "transparent",
                            marginLeft: "55%",
                            width: "45%",
                            height: "2.3em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "25px",
                            marginTop: "-10%",
                          }}
                          onClick={(e) => {
                            navigate(`/edit-listing/${listing._id}`);
                          }}
                        >
                          Manage Listing
                        </button>
                      </div>
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
};

export default AgentListings;
