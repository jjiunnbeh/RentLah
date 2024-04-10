import Customer from "../db/customer.model.js";
import Agent from "../db/agent.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken"; //jwt
import "dotenv/config";
import mongoose, { Mongoose } from "mongoose";

function isPasswordStrong(password) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Example regular expression
  return regex.test(password);
}
export const changePass = async (req, res, next) => {
  const { old, newPass, username, userType } = req.body;
  const strongpass = isPasswordStrong(newPass);

  if (newPass.length < 10) {
    return next(
      errorHandler(401, {
        type: "password",
        content: "Password length must be greater than 10.",
      })
    );
  }
  if (!strongpass) {
    return next(
      errorHandler(401, {
        type: "password",
        content:
          "Password must contain at least 1 upper Case letter, 1 special symbol and normal case letter",
      })
    );
  }
  const hashedPassword = bcryptjs.hashSync(newPass, 10);
  try {
    let user;
    if (userType == "customer") {
      user = await Customer.findOne({ username: username });
    }
    if (userType == "agent") {
      user = await Agent.findOne({ username: username });
    }
    if (user) {
      const validPassword = bcryptjs.compareSync(old, user.password);
      if (!validPassword) {
        return next(
          errorHandler(401, {
            type: "oldpassword",
            content: "Old password is incorrect",
          })
        );
      } else {
        user.password = hashedPassword;
        await user.save();
        const { password: pass, ...rest } = user._doc;
        res.status(200).json({ rest });
      }
    }
  } catch (error) {
    return next(error);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const { email, phoneNo, username } = req.body;
    const validCustomer = await Customer.findOne({ username: username });
    if (email != "") {
      validCustomer.email = email;
    }
    if (phoneNo != "") {
      validCustomer.phoneNo = phoneNo;
    }

    await validCustomer.save();
    const { password: pass, ...rest } = validCustomer._doc;
    res.status(200).json({ rest });
  } catch (error) {
    if (error.keyValue.email)
    {
      return next(
        errorHandler(
          409,
          {type:"email",content: "Email address already existed in our database."}
        ))
    }
    if (error.keyValue.phoneNo)
    {
      return next(
        errorHandler(
          409,
          {type:"phoneNo",content: "Phone number already existed in our database."}
        ))
    }
    return next(error);
  }
  
};
export const updateAgent = async (req, res, next) => {
  try {
    const { email, phoneNo, username, agentregnum } = req.body;
    const validAgent = await Agent.findOne({ username: username });

    if (email != "") {
      validAgent.email = email;
    }
    if (phoneNo != "") {
      validAgent.phoneNo = phoneNo;
    }
    if (agentregnum != "") {
      validAgent.agentregnum = agentregnum;
    }
    await validAgent.save();
    const { password: pass, ...rest } = validAgent._doc;
    res.status(200).json({ rest });
  } catch (error) {
    if (error.keyValue.email)
    {
      return next(
        errorHandler(
          409,
          {type:"email",content: "Email address already existed in our database."}
        ))
    }
     if (error.keyValue.phoneNo)
    {
      return next(
        errorHandler(
          409,
          {type:"phoneNo",content: "Phone number already existed in our database."}
        ))
    }
    if (error.keyValue.agentregnum)
    {
      return next(
        errorHandler(
          409,
          {type:"agentregnum",content: "Registration number already existed in our database."}
        ))
    }
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
export const resetPassword = async (req, res, next) => {
  const { password, passwordconfirm, id, userType } = req.body;
  const strongpass = isPasswordStrong(password);
  const ObjectId = mongoose.Types.ObjectId;
  const validId = new ObjectId(id);
  if (password !== passwordconfirm) {
    return next(
      errorHandler(401, {
        type: "passwordconfirm",
        content: "Password does not match",
      })
    );
  }
  if (password.length < 10) {
    return next(
      errorHandler(401, {
        type: "password",
        content: "Password length must be greater than 10.",
      })
    );
  }
  if (!strongpass) {
    return next(
      errorHandler(401, {
        type: "password",
        content:
          "Password must contain at least 1 upper Case letter, 1 special symbol and normal case letter",
      })
    );
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  try {
    let user;
    console.log(password);
    console.log(userType);
    console.log(id);
    if (userType == "customer") {
      user = await Customer.findOne({ _id: validId });
      user.password = hashedPassword;
      await user.save();
      const { password: pass, ...rest } = user._doc;
      res.status(200).json({ rest });
    } else {
      user = await Agent.findOne({ _id: validId });
      user.password = hashedPassword;
      await user.save();
      const { password: pass, ...rest } = user._doc;
      res.status(200).json({ rest });
    }
  } catch (error) {
    console.log("here");
    return next(error);
  }
};

export const getAgent = async (req, res, next) => {
  try {
    console.log(req.params.username);
    const agent = await Agent.findOne({ username: req.params.username });
    console.log(agent);
    if (!agent) {
      return next(errorHandler(404, "Agent not found!"));
    }
    res.status(200).json(agent);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const addToWatchList = async (req, res, next) => {
  try {
    const { username } = req.body;
    const customer = await Customer.findOne({ username: username });
    if (!customer) {
      return next(
        errorHandler(404, {
          type: "database",
          content: "Customer not found.",
        })
      );
    }
    if (customer.watchList.includes(req.params.id)) {
      return next(
        errorHandler(400, {
          type: "watchlist",
          content: "Property already in your watchlist.",
        })
      );
    }

    customer.watchList.push(req.params.id);
    await customer.save();
    const { password: pass, ...rest } = customer._doc;
    res.status(200).json({ rest });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const deleteFromWatchList = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.userid);
    if (!customer) {
      return next(
        errorHandler(404, {
          type: "database",
          content: "Customer not found.",
        })
      );
    }
    if (customer.watchList.length === 0)
    {
      return next(
        errorHandler(400, {
          type: "empty",
          content: "Watchlist is empty now.",
        })
      );
    }
    const indexToRemove = customer.watchList.indexOf(req.params.id);
    if (indexToRemove === -1) {
      return next(
        errorHandler(400, {
          type: "database",
          content: "The id is not in the watchlist.",
        })
      );
    }
    customer.watchList.splice(indexToRemove, 1);
    await customer.save();
    const { password: pass, ...rest } = customer._doc;
    res.status(200).json({ rest });

  }catch (error) {
    console.log(error);
    return next(error);
  }
};
