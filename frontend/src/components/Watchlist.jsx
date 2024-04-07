import React, { useState, useEffect } from 'react';
import Triangles from "../components/Triangles";
import NavBar from "../components/NavBar";
import "../styles/ViewPropertiesPage.css";
import PaginationComponent from "../components/PageNavigator";
//import { fetchPropertyListings } from './propertyListings'; // Import the fetchPropertyListings function from your backend API file

const PropertyListings = ({ listings }) => {
    return (
        <div>
            <h2>Available Property Listings</h2>
            <ul>
                {listings.map((listing, index) => (
                    <li key={index}>
                        <p>{listing.address}</p>
                        <p>{listing.price}</p>
                        {/* all property details go here*/}
                    </li>
                ))}
            </ul>
        </div>
    );
};

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

const Watchlist = () => {
    const [propertyListings, setPropertyListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    const listing1 = {
        name:"PDR The Gardens at Your Mom's House",
        postalCode:649823,
        price:69.69,
        description:"ARC",
        address:'This is\nsupposed to be\nannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn ',
        bedroom:3,
        bathroom:2,
        images:["https://firebasestorage.googleapis.com/v0/b/rentlah-667e3.appspot.com/o/1711687189301download%20(1).jpeg?alt=media&token=359100cb-2c18-4666-8ba8-ccc80c88e025","https://firebasestorage.googleapis.com/v0/b/rentlah-667e3.appspot.com/o/1711687215981download.jpeg?alt=media&token=d05befb6-d255-4bc9-b217-fe8e05ce5a45"],
        agentRef:"agent1",
        latitude: 1.4332513,
        longitude: 103.7874458
      };

    // useEffect(() => {
    //     // Fetch property listings when the component mounts
    //     fetchPropertyListings()
    //         .then((listings) => setPropertyListings(listings))
    //         .catch((error) => console.error('Error fetching property listings:', error.message));
    // }, []);

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
            <div className="row text-center" style={{marginLeft:"30%",marginRight:"30%", marginTop:"5%"}}>
                 <h1>Watchlist </h1>
            </div>
        </div>

        <div className="d-grid gap-3" style={{marginTop:"3%", marginLeft:"17%",marginRight:"17%"}}>
            {
                [...Array(10)].map((e,i) => <div className="row" key={i}>
                                                    <div className='col-sm-auto'>
                                                        <div className="img-div">
                                                            <img  src={listing1.images[0]}></img>
                                                        </div>
                                                    </div>

                                                    <div className="col d-grid mt-2 gap-2">
                                                        <div className="row" style={{width:"545px"}}>
                                                            <h2 className="text-truncate"> {listing1.name} </h2>
                                                        </div>
                                                        <div className="row" style={{width:"545px"}}>
                                                            <h2 className="text-truncate"> Address: {listing1.address} </h2>
                                                        </div>
                                                        <div className="row" style={{width:"545px"}}>
                                                        <h2> ${listing1.price} </h2>
                                                        </div>
                                                    </div>

                                                    <div className="col d-grid align-self-end gap-2">
                                                        <div className="row text-end">
                                                            <a className="Listing" href="">
                                                            {" "}
                                                            Learn more...{" "}
                                                            </a>
                                                        </div>

                                                        <div className="row mb-5 text-end">
                                                            <a className="Listing" href="">
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

export default Watchlist;
