import React, { useState, useEffect } from 'react';
import { fetchPropertyListings } from './propertyListings'; // Import the fetchPropertyListings function from your backend API file
import axios from "axios";



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
        <div>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

const ViewPropertiesPage = () => {
    // const [propertyListings, setPropertyListings] = useState([]);
    const BASE_URL = "http://localhost:3000";
    const { searchTerm, bedroom, bathroom, price } = useParams();
    const [propertyListings, setPropertyListings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let searchQuery = '';
                if (searchTerm) {
                    if (bedroom || bathroom || price) {
                        searchQuery = `${searchTerm}/${bedroom}/${bathroom}/${lowerPrice}/${upperPrice}`;
                    } else {
                        searchQuery = searchTerm;
                    }
                }
                // Fetch property listings based on the constructed search query
                const listings = await axios.get(`${BASE_URL}/api/listing/search/${searchQuery}`);
                console.log(listings)
                setPropertyListings(listings);
            } catch (error) {
                console.error('Error fetching property listings:', error.message);
            }
        };

        fetchData();
    }, [searchTerm, bedroom, bathroom, price]);



   

    return (
        <div>
            <SearchBar />
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
        </div>
    );
};

export default ViewPropertiesPage;
