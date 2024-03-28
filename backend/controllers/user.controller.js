import Customer from "../db/customer.model.js";
import Agent from "../db/agent.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken"; //jwt
import "dotenv/config";


export const changePassAgent =()=>{}
export const changePassCustomer = () =>{}

export const updateProfiePic = async (req, res, next) =>
{
    const{username, imageurl, userType, token} = req.body;
    let user;
    try{
        if (String(userType) === "Customer")
    {
        user = await Customer.findOne({username});
    }
    else
    {
        user = await Agent.findOne({username});
    }
    user.profilepic = imageurl;
    await user.save();
    const {password: pass, ...rest} = user._doc;
    res.status(200).json({rest, token})
    }catch(error){
        console.log("here")
        return next(error);
    }
    



}


