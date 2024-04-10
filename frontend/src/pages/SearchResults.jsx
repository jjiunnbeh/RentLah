import React, { useState, useEffect } from 'react';
import Triangles from "../components/Triangles";
import NavBar from "../components/NavBar";
import "../styles/SearchResults.css";
import PaginationComponent from "../components/PageNavigator";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
  } from "../redux/user/userSlice";
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
    const [searchQuery, setSearchQuery] = useState('');
    

    const handleSearch = () => {
        // Implement search functionality here
    };

    return (
        <div className='input-group'>
            <input className="form-control" type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button className="btn btn-dark" style={{fontSize:"25px"}} onClick={handleSearch}>🔍</button>
        </div>
    );
};

const SearchResults = () => {
    const [propertyListings, setPropertyListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { searchTerm, bedroom, bathroom, lowerPrice, upperPrice  } = useParams();
    const BASE_URL = "http://localhost:3000";
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                let searchQuery = '';
                if (searchTerm) {
                    if (bedroom && bathroom && lowerPrice && upperPrice) {
                        searchQuery = `${searchTerm}/${bedroom}/${bathroom}/${lowerPrice}/${upperPrice}`;
                    } else {
                        searchQuery = searchTerm;
                    }
                }
                // Fetch property listings based on the constructed search query
                const listings = await axios.get(`${BASE_URL}/api/listing/search/${searchQuery}`);
                console.log(listings.data)
                setPropertyListings(listings.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [searchTerm, bedroom, bathroom, lowerPrice, upperPrice]);

    return (
        <>
        
            <header>
                <NavBar />
            </header>
            <Triangles />
        {/* <div>
            <SearchBar />
            <PropertyListings listings={propertyListings} />
        </div> */}

        <div className="col justify-content-center">
            <div className="row" style={{marginLeft:"30%",marginRight:"30%", marginTop:"5%"}}>
                 <SearchBar />
            </div>
        </div>

        <div className="d-grid gap-3" style={{marginTop:"3%", marginLeft:"17%",marginRight:"17%"}}>
            {
            propertyListings.slice(0, 10).map((listing) => <div className="row" key={listing._id}>
                                                    <div className='col-sm-auto'>
                                                        <div className="img-div">
                                                            <img  src={listing.images[0]}></img>
                                                        </div>
                                                    </div>

                                                    <div className="col d-grid mt-2 gap-2">
                                                        <div className="row" style={{width:"545px"}}>
                                                            <h2 className="text-truncate"> {listing.name} </h2>
                                                        </div>
                                                        <div className="row" style={{width:"545px"}}>
                                                            <h2 className="text-truncate"> Address: {listing.address} </h2>
                                                        </div>
                                                        <div className="row" style={{width:"545px"}}>
                                                        <h2> ${listing.price} </h2>
                                                        </div>
                                                    </div>

                                                    <div className="col d-grid align-self-end gap-2">
                                                        <div className="row text-end">
                                                            <a className="Listing" href={"/listing/"+listing._id}>
                                                            {" "}
                                                            Learn more...{" "}
                                                            </a>
                                                        </div>

                                                        <div className="row mb-5 text-end">
                                                            <a className="Listing" onClick={handleAddtoWatchList(listing._id)}>
                                                            {" "}
                                                            Add to watchlist{" "}
                                                            </a>
                                                        </div>

                                                    </div>
                                                </div>)
            }
        </div>

        <div className="row justify-content-center" style={{marginBottom:"3%", marginTop:"3%"}}>
            <div className='col-4 d-flex justify-content-center' >
            <PaginationComponent itemsCount={5} itemsPerPage={10} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
        </div>
        </>
    );
};

export default SearchResults;