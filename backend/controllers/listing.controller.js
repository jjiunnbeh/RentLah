import {Property}  from "../db/property.model.js"
export const createListing = async(req, res, next) =>
{
    try{

        const listing = await Property.create(req.body);
        return res.status(201).json(listing);

    }catch(error)
    {
        next(error);

    }
}