import React, { useState, useEffect } from 'react';
import { fetchPropertyListings } from './propertyListings'; // Import the fetchPropertyListings function from your backend API file

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
        <div>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

const ViewPropertiesPage = () => {
    const [propertyListings, setPropertyListings] = useState([]);

    useEffect(() => {
        // Fetch property listings when the component mounts
        fetchPropertyListings()
            .then((listings) => setPropertyListings(listings))
            .catch((error) => console.error('Error fetching property listings:', error.message));
    }, []);

    return (
        <div>
            <SearchBar />
            <PropertyListings listings={propertyListings} />
        </div>
    );
};

export default ViewPropertiesPage;
