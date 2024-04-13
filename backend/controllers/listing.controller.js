import {Property}  from "../db/property.model.js"
import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import errorHandler from "../utils/error.js";
import Customer from "../db/customer.model.js";

export const createListing = async(req, res, next) =>
{
    try{
        const {name, postalCode, price, description, bedroom, bathroom, images, agentRef} = req.body;
        if (images.length == 0)
        {
          return next(errorHandler(401, {type:"images", content:"You must at least upload one picture."}));
        }
        //convert postalCode into coordinates
        const response = await axios.get(`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`);
        console.log(response.data.results[0]);
        if (!response.data.results[0])
        {
            return next(
                errorHandler(
                  401,
                  {type:"postalcode", content:"Invalid postal code"}
                  
                ))
        }
        // Extract latitude and longitude from the response
        const { LATITUDE, LONGITUDE,ADDRESS } = response.data.results[0];
        const listing = await Property.create({name, postalCode, price, description,address: ADDRESS, bedroom, bathroom, images, agentRef, LATITUDE: LATITUDE, LONGITUDE: LONGITUDE });
        return res.status(201).json(listing);
    }catch(error)
    {
        console.log(error)
        return next(
            errorHandler(
              501,
              {type:"server", content:"Server error"}
            ))
    }
}

//get listing from database
export const getListing = async (req, res, next) => {
  try {
    const listing = await Property.findById(req.params.id);
    if (!listing) 
    {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};


export const getWatchlistListings = async (req, res, next) => {
   
    try {
      
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
        return res.status(404).json({ message: "User not found." });
      }
      const listingIds = customer.watchList;

      if (listingIds.length === 0) {
        return res.status(200).json({ message: "You don't have anything in the watchlist." });
      }
      const validPropertyIds = [];
    for (const listingId of listingIds) {
      const property = await Property.findById(listingId);
      if (property) {
        validPropertyIds.push(listingId);
      } else {
        console.log(`Invalid property ID ${listingId} found in watchlist. Removing from watchlist.`);
      }
    }
    customer.watchList = validPropertyIds;
    await customer.save();


    const propertyIds = customer.watchList;
      
      const propertyPromises = propertyIds.map(async (propertyId) => {
        const property = await Property.findById(propertyId);
        return property;
      });
      const properties = await Promise.all(propertyPromises);
  
      res.status(200).json(properties);
  
    } catch (error) {
      return next(error);
    }
  };

  export const getAgentListings = async (req, res, next) => {
    const {username} = req.query;
    console.log(username);
    try
    {
      const listings = await Property.find({agentRef: username});
      if (!listings)
      {
        return next(errorHandler(400, {type:"managedList", content:"There is no property managed by you."}))
      }
      res.status(200).json(listings);
      console.log(listings);
    }
    catch(error)
    {
      next(error);
    }

  };

  export const getAllListings = async (req, res, next) => {
    try {
      const listings = await Property.find();
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  };


  export const deleteListing = async (req, res, next) => {
    try {
      const listingID = req.params.id;
      const listing = await Property.findById(listingID);
      if (!listing) {
        return next(errorHandler(400, {type:"database", content:"Property is not in the database."}))
      }
      await Property.findByIdAndDelete(listingID);

      res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };

  export const editListing = async (req, res, next) => {
    try {
      const listingID = req.params.id;
      const listing = await Property.findById(listingID);
      
      if (!listing) {
        return next(errorHandler(400, { type: "database", content: "Property is not in the database." }));
      }
  
      const { name, postalCode, price, description, bedroom, bathroom } = req.body;
  
      if (name !== undefined && name !== "") {
        listing.name = name;
      }
  
      if (postalCode !== undefined && postalCode !== 0) {
        const response = await axios.get(`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`);
        console.log(response.data.results[0]);
        if (!response.data.results[0])
        {
            return next(
                errorHandler(
                  401,
                  {type:"postalcode", content:"Invalid postal code"}
                  
                ))
        }
      
        const { LATITUDE, LONGITUDE,ADDRESS } = response.data.results[0];
        listing.postalCode = postalCode;
        listing.LATITUDE = LATITUDE;
        listing.address = ADDRESS;
        listing.LONGITUDE = LONGITUDE;
      }
  
      if (price !== undefined && price !== 0) {
        listing.price = price;
      }
  
      if (description !== undefined && description !== "") {
        listing.description = description;
      }
  
      if (bedroom !== undefined && bedroom !== 0) {
        listing.bedroom = bedroom;
      }
  
      if (bathroom !== undefined && bathroom !== 0) {
        listing.bathroom = bathroom;
      }
  
      await listing.save();
      res.status(200).json(listing);
  
    } catch (error) {
      return next(error);
    }
  };


  export const searchListingByNameandAddress = async (req, res, next) => {
    try {
      let finalList;
      const searchTerm = req.params.searchterm;
      if (searchTerm === "all") {
        const response = await Property.find();
        finalList = response;
      } else {
        const addressMatches = await Property.find({ address: { $regex: searchTerm, $options: 'i' } });
        const nameMatches = await Property.find({ name: { $regex: searchTerm, $options: 'i' } });
      
        const allMatches = [...addressMatches, ...nameMatches];
        const uniqueMatches = Array.from(new Set(allMatches.map(property => property._id.toString())));
      
        finalList = uniqueMatches.map(id => allMatches.find(property => property._id.toString() === id));
      }
      console.log("Query length: " + finalList.length);
      res.status(200).json(finalList);
    } catch (error) {
      next(error);
    }
  };

  export const fullSearch = async (req, res, next) => {
  

      try {
        let finalList;
        const { searchTerm, bedroom, bathroom, lowerPrice, upperPrice } = req.params;
        if (searchTerm === "all") {
          const response = await Property.find();
          finalList = response;
        } else {
          const addressMatches = await Property.find({ address: { $regex: searchTerm, $options: 'i' } });
          const nameMatches = await Property.find({ name: { $regex: searchTerm, $options: 'i' } });
        
          const allMatches = [...addressMatches, ...nameMatches];
          const uniqueMatches = Array.from(new Set(allMatches.map(property => property._id.toString())));
        
          finalList = uniqueMatches.map(id => allMatches.find(property => property._id.toString() === id));
        }
  
      finalList = finalList.filter(property => {
        let isValid = true;
        if (bedroom !== undefined && property.bedroom !== parseInt(bedroom)) {
          isValid = false;
        }
        if (bathroom !== undefined && property.bathroom !== parseInt(bathroom)) {
          isValid = false;
        }
        if (lowerPrice !== undefined && property.price < parseInt(lowerPrice)) {
          isValid = false;
        }
        if (upperPrice !== undefined && property.price > parseInt(upperPrice)) {
          isValid = false;
        }
        return isValid;
      });
  
      if (finalList.length === 0) {
        return next(errorHandler(400, { message: "No property found" }));
      }
  
      res.status(200).json(finalList);
    } catch (error) {
      console.error("Error:", error);
      next(error);
    }
  };
  