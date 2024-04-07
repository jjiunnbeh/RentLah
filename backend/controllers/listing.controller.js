import {Property}  from "../db/property.model.js"
import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import errorHandler from "../utils/error.js";

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

