const fetch = require('node-fetch');

// Function to fetch property listings within a 5-kilometer radius
async function fetchPropertyListings(userLocation) {
    try {
        // API endpoint and token - URA API
        const apiUrl = `https://www.ura.gov.sg/uraDataService/invokeUraDS?service=PM25_PSI_Readings`;
        const token = 'AD574fFeV-g7d0tzu896re-kapt50EYh7vM8r4szcAT3Gd-@kn9804f7HnG-5JfR56k2mKuY-85d-cVV3VNc0G69HWhyNS3-fheb'; // token generated, valid for 1 day

        // HTTP POST request to the API endpoint 
        const response = await fetch(apiUrl, {
            method: 'POST', // request method - ref to documentation
            headers: {
                'Content-Type': 'application/json',
                'Token': token
            },
            body: JSON.stringify({
                "accessKey": "AD574fFeV-g7d0tzu896re-kapt50EYh7vM8r4szcAT3Gd-@kn9804f7HnG-5JfR56k2mKuY-85d-cVV3VNc0G69HWhyNS3-fheb"
            })
        });

        // Checking if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error(`Failed to fetch property listings. Status: ${response.status}`);
        }

        // Parsing the JSON response
        const propertyListings = await response.json();
        return propertyListings;
    } catch (error) {
        console.error("Error fetching property listings:", error.message);
        throw error;
    }
}

// Example usage:
// Assuming `userLocation` is the user's location
// fetchPropertyListings(userLocation)
//     .then((propertyListings) => {
//         console.log("Property listings:", propertyListings);
//     })
//     .catch((error) => {
//         console.error("Error fetching property listings:", error.message);
//     });


// Function to handle browse home page use case
async function browseHomePage(user) {
    try {
        // 1. use API to get the listings
        const propertyListings = await fetchPropertyListings(user.location);

        // 2. Return the fetched property listings, display on home page
        return propertyListings;
    } catch (error) {
        console.error("Error browsing home page:", error.message);
        throw error;
    }
}






/* const fetch = require('node-fetch');

// Function to fetch property listings within a 5-kilometer radius-ref to use case
async function fetchPropertyListings(userLocation) {
    try {
        // API end point
        const apiUrl = `https://example.com/api/property-listings?location=${userLocation}&radius=5km`; // replace wtih API endpoint
        // parameter: location, radius depend on API

        // HTTP GET request to the API endpoint
        const response = await fetch(apiUrl);

        // Checking if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error(`Failed to fetch property listings. Status: ${response.status}`);
        }

        // Parsing the JSON response
        const propertyListings = await response.json();
        return propertyListings;
    } catch (error) {
        console.error("Error fetching property listings:", error.message);
        throw error;
    }
}
*/


// Example usage:
// Assuming `userLocation` is the user's location
// fetchPropertyListings(userLocation)
//     .then((propertyListings) => {
//         console.log("Property listings:", propertyListings);
//     })
//     .catch((error) => {
//         console.error("Error fetching property listings:", error.message);
//     });


// Function to handle browse home page use case
async function browseHomePage(user) {
    try {
        // 1. use API to get the listings
        const propertyListings = await fetchPropertyListings(user.location);

        // 2. Return the fetched property listings, display on home page
        return propertyListings;
    } catch (error) {
        console.error("Error browsing home page:", error.message);
        throw error;
    }
}


/*
example using Zillow API
const fetch = require('node-fetch');

async function fetchPropertyListings(userLocation) // format of user loc depends on API doc{
    // Zillow API endpoint for searching property listings
    const apiKey = 'YOUR_ZILLOW_API_KEY'; // replace with actual key
    const endpoint = `https://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${apiKey}&address=${userLocation}&citystatezip=${userLocation}&rentzestimate=true`;

    try {
        // Fetch property listings from Zillow API
        const response = await fetch(endpoint);
        const data = await response.json();

        // Check if the response contains property listings
        if (data && data.response && data.response.results && data.response.results.length > 0) {
            // Extract property listings from the response
            const propertyListings = data.response.results.map(listing => ({
                address: listing.address,
                rentZestimate: listing.rentzestimate.amount, // based on documnentation
            }));
            return propertyListings;

        } else {
            console.error('No property listings found');
            return [];
        }
    } catch (error) {
        console.error('Error fetching property listings:', error.message);
        throw error;
    }
}

// Example usage:
// const propertyListings = await fetchPropertyListings('New York');
// console.log(propertyListings);
*/
