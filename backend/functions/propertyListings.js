// propertyListings.js

const express = require('express');
const router = express.Router();

// Sample property listings data (replace with logic)
const propertyListings = [
    { id: 1, address: '123 Main St', price: '$2000' },
    { id: 2, address: '456 Elm St', price: '$2500' },
    { id: 3, address: '789 Oak St', price: '$2200' }
];

// Function to fetch property listings
const fetchPropertyListings = () => { // explicit declaration
    return propertyListings;
};

// Route to fetch property listings
router.get('/property-listings', (req, res) => {
    try {
     // listing details have to be fetched - api or database
        res.json({ propertyListings: fetchPropertyListings() });
    } catch (error) {
        console.error('Error fetching property listings:', error.message);
        res.status(500).json({ error: 'Failed to fetch property listings' });
    }
});

module.exports = { fetchPropertyListings };


/*

const express = require('express');
const router = express.Router();

// Sample property listings data (replace with actual data logic)
const propertyListings = [
    { id: 1, address: '123 Main St', price: '$2000' },
    { id: 2, address: '456 Elm St', price: '$2500' },
    { id: 3, address: '789 Oak St', price: '$2200' }
];

// Route to fetch property listings
router.get('/property-listings', (req, res) => {
    try {
        //property details must be fetched by external api or database
        // sending back sample data here
        res.json({ propertyListings });
    } catch (error) {
        console.error('Error fetching property listings:', error.message);
        res.status(500).json({ error: 'Failed to fetch property listings' });
    }
});

module.exports = router;

*/




