import { useState, useEffect } from "react";
import Triangles from "../components/Triangles";
import NavBar from "../components/NavBar";
import "../styles/SearchResults.css";
import PaginationComponent from "../components/PageNavigator";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";


const Watchlist = () => {
  const [propertyListings, setPropertyListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const currentUser = useSelector((state) => state.user.currentUser);
  const BASE_URL = "http://localhost:3000";
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const handleDeleteWatchList = (listingID) => async (event) => {
    // const listingID = listing._id;

    event.preventDefault();
    dispatch(updateUserStart());

    try {
      const response = await axios.delete(
        `${BASE_URL}/api/user/delete-from-watchlist/${listingID}/${currentUser._id}`,
        { username: currentUser.username }
      );
      if (response.status == 200) {
        dispatch(updateUserSuccess(response.data.rest));
        console.log(response.data.rest);
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const userType = useSelector((state) => state.user.currentUser.userType);


  useEffect(() => {
    const BASE_URL = "http://localhost:3000";
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/listing/get-watchlist/${currentUser._id}`
        );
        if (response.status == 200) {
          setPropertyListings(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {userType === "Customer" ? (
        <>
          <header>
            <NavBar userType={userType} />
          </header>
          <Triangles />
          {/* <div>
            <SearchBar />
            <PropertyListings listings={propertyListings} />
        </div> */}

          <div className="col justify-content-center">
            <div
              className="row text-center"
              style={{ marginLeft: "30%", marginRight: "30%", marginTop: "5%" }}
            >
              <h1>Watchlist </h1>
            </div>
          </div>

          <div
            className="d-grid gap-3"
            style={{ marginTop: "3%", marginLeft: "17%", marginRight: "17%" }}
          >
            {propertyListings.length > 0 &&
              propertyListings
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((listing) => (
                  <div className="row" key={listing._id}>
                    {listing.images && (
                      <div className="col-sm-auto">
                        <div className="img-div">
                          <img src={listing.images[0]}></img>
                        </div>
                      </div>
                    )}

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
                      <div className="row text-end">
                        <a className="Listing" href={"/listing/" + listing._id}>
                          {" "}
                          Learn more...{" "}
                        </a>
                      </div>

                      <div className="row mb-5 text-end">
                        <a
                          className="Listing"
                          onClick={handleDeleteWatchList(listing._id)}
                        >
                          {" "}
                          Delete from watchlist{" "}
                        </a>
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
            <PaginationComponent
                itemsCount={propertyListings.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </>
      ) : (
        <div>
          <h1>Error 404: Page not found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      )}
    </>
  );
};

export default Watchlist;
