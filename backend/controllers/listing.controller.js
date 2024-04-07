import {Property}  from "../db/property.model.js"
import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import errorHandler from "../utils/error.js";
import Customer from "../db/customer.model.js";

export const createListing = async(req, res, next) =>
{
    try{
        const {name, postalCode, price, description, address, bedroom, bathroom, images, agentRef} = req.body;
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
        const { LATITUDE, LONGITUDE } = response.data.results[0];
        const listing = await Property.create({name, postalCode, price, description,address, bedroom, bathroom, images, agentRef, LATITUDE: LATITUDE, LONGITUDE: LONGITUDE });
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
    const { username } = req.body;
    try {
      const customer = await Customer.findOne({ username: username });
      if (!customer) {
        return res.status(404).json({ message: "User not found." });
      }
      const propertyIds = customer.watchList;

      if (propertyIds.length === 0) {
        return res.status(200).json({ message: "You don't have anything in the watchlist." });
      }
  
      // Fetch properties using findById for each property ID
      const propertyPromises = propertyIds.map(async (propertyId) => {
        const property = await Property.findById(propertyId);
        return property;
      });
  
      // Resolve all promises to get the properties
      const properties = await Promise.all(propertyPromises);
  
      res.status(200).json(properties);
  
    } catch (error) {
      return next(error);
    }
  };

  export const getAgentListings = async (req, res, next) => {
    const {username} = req.body;
    try
    {
      const listings = await Property.find({agentRef: (username.toUpperCase())});
      res.status(200).json(listings);
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




