import Customer from "../db/customer.model.js";
import Agent from "../db/agent.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken"; //jwt
import "dotenv/config";
import mongoose, { Mongoose } from "mongoose";

function isPasswordStrong(password) {     
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Example regular expression
  return regex.test(password);
}
export const changePass= async (req, res, next) => {
    const {old, newPass, username, userType} = req.body;
    const strongpass = isPasswordStrong(newPass);
    
    
    if (newPass.length < 10)
    {
      return next(
        errorHandler(
          401,
          {type:"password", content:"Password length must be greater than 10."}
          
        ))
    }
    if (!strongpass)
    {
      return next(
        errorHandler(
          401,
          {type:"password", content:"Password must contain at least 1 upper Case letter, 1 special symbol and normal case letter"}
        ))
    }
    const hashedPassword = bcryptjs.hashSync(newPass, 10);
    try{
      let user;
      if (userType == "customer")
      {
        user = await Customer.findOne({username: username});
      }
      if (userType == "agent")
      {
        user = await Agent.findOne({username: username});
      }
      if (user)
      {
        const validPassword = bcryptjs.compareSync(
          old,
          user.password
        );
        if (!validPassword)
        {
          return next(
            errorHandler(
              401,
              {type:"oldpassword", content:"Old password is incorrect"}
            )
          )
        }
        else
        {
          user.password = hashedPassword;
          await user.save();
          const { password: pass, ...rest } = user._doc;
          res.status(200).json({ rest });
      
        }
      }
    }catch(error)
    {
      return next(error);
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

export const getListings = async (req, res, next) => {
  if (req.customer.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};
