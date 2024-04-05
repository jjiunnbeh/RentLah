import Customer from "../db/customer.model.js";
import Agent from "../db/agent.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken"; //jwt
import "dotenv/config";
import mongoose, { Mongoose } from "mongoose";


export const changePassAgent = async (req, res, next) => {
    try{
        
    }catch(error)
    {

    }

};
export const changePassCustomer = async(req, res, next) => {
    try{

    }catch(error)
    {
        
    }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const { email, phoneNo, username } = req.body;
    const validCustomer = await Customer.findOne({ username: username });
    if (email != "")
    {
      validCustomer.email = email;

    }
    if (phoneNo!= "")
    {
      validCustomer.phoneNo = phoneNo;
    }

    await validCustomer.save();
    const { password: pass, ...rest } = validCustomer._doc;
    res.status(200).json({ rest });
  } catch (error) {
    return next(error);
  }
};
export const updateAgent = async (req, res, next) => {
    try {
        const { email, phoneNo, username, agentregnum} = req.body;
        const validAgent = await Agent.findOne({ username: username });

        if (email != "")
        {
          validAgent.email = email;
        }
        if (phoneNo!= "")
        {
          validAgent.phoneNo = phoneNo;
        }
        if (agentregnum != "")
        {
          validAgent.agentregnum = agentregnum;
        }
        await validAgent.save();
        const { password: pass, ...rest } = validAgent._doc;
        res.status(200).json({ rest });
      } catch (error) {
        return next(error);
      }
};
export const updateProfiePic = async (req, res, next) => {
  const { username, imageurl, userType } = req.body;
  let user;
  try {
    if (String(userType) === "Customer") {
      user = await Customer.findOne({ username });
    } else {
      user = await Agent.findOne({ username });
    }
    user.profilepic = imageurl;
    await user.save();
    const { password: pass, ...rest } = user._doc;
    res.status(200).json({ rest });
  } catch (error) {
    console.log("here");
    return next(error);
  }
};
export const resetPassword = async(req, res, next)=>
{
    const {password, id, userType} =req.body
    const ObjectId =mongoose.Types.ObjectId;
    const validId = new ObjectId(id)

    const hashedPassword = bcryptjs.hashSync(password, 10);
    try{
        let user;
        console.log(password);
        console.log(userType);
        console.log(id);
        if (userType == "customer")
        {
          
            user = await Customer.findOne({_id: validId });
            user.password = hashedPassword;
            await user.save();
            const { password: pass, ...rest } = user._doc;
            res.status(200).json({ rest });
        }
        else
        {
            user = await Agent.findOne({_id: validId });
            user.password = hashedPassword;
            await user.save();
            const { password: pass, ...rest } = user._doc;
            res.status(200).json({ rest });
        
        }


    }catch (error) {
        console.log("here");
        return next(error);
      }

}
