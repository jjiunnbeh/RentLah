import {Property}  from "../db/property.model.js"
import axios from "axios";
import dotenv from "dotenv";
import { Command } from "commander";
import fs from "fs";
export const createListing = async(req, res, next) =>
{
    try{
        const {name, postalCode, price, address, bedroom, bathroom, images, agentRef} = req.body;
        //convert postalCode into coordinates



        const listing = await Property.create(req.body);
        return res.status(201).json(listing);

    }catch(error)
    {
        next(error);

    }
}