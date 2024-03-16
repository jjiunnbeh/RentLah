import Customer from "../db/customer.model.js";
import Agent from "../db/agent.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken"; //jwt
import "dotenv/config";

//Register Customer
export const registerCustomer = async (req, res, next) => {
  const { username, email, password, phoneNo } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newCustomer = new Customer({
    username,
    email,
    password: hashedPassword,
    phoneNo,
  });
  try {
    await newCustomer.save();
    console.log(`${newCustomer.username} 's account is created sucessfully`)
    res
      .status(201)
      .json(`${newCustomer.username} 's account is created sucessfully`);
  } catch (error) {
    console.log("Failure to register")
    next(errorHandler(500, error.message));
  }
};
//Register Agent
export const registerAgent = async (req, res, next) => {
  const {
    username,
    email,
    password,
    phoneNo,
    agentFullName,
    agentRegNo,
    estateCompanyName,
  } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newAgent = new Agent({
    username,
    email,
    password: hashedPassword,
    phoneNo,
    agentFullName,
    agentRegNo,
    estateCompanyName,
  });
  try {
    await newAgent.save();
    res
      .status(201)
      .json(`${newAgent.username} 's account is created sucessfully`);
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

//Customer Login
export const loginCustomer = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const validCustomer = await Customer.findOne({ username });
    if (!validCustomer) {
      return next(errorHandler(404, "Invalid username or pasword"));
    }
    //Customer do exist, now check the acccount lock status
    if (validCustomer.accountLocked) {
      const curTime = new Date();
      const lockDuration = 5 * 60 * 1000;
      const unlockTime = new Date(
        validCustomer.lockedAt.getTime() + lockDuration
      );

      // Check if it's time to unlock the account
      if (curTime >= unlockTime) {
        // Reset login attempt counter and then unlock the account
        validCustomer.loginAttempts = 0;
        validCustomer.accountLocked = false;
        //Save info back to database
        await validCustomer.save();
      } else {
        const remainingTime = Math.ceil((unlockTime - curTime) / 1000); // Remaining time in seconds
        return next(
          errorHandler(
            403,
            `Account is locked. Please try again in ${remainingTime} seconds`
          )
        );
      }
    }
    const validPassword = bcryptjs.compareSync(
      password,
      validCustomer.password
    );
    if (!validPassword) {
        validCustomer.loginAttempts += 1;
        if (validCustomer.loginAttempts >= 5)
        {
            validCustomer.accountLocked = true;
            validCustomer.lockedAt = new Date();
        }
        await validCustomer.save();
      return next(errorHandler(401, "Invalid username or password"));
    }
    const jwtToken = jwt.sign(
      { id: validCustomer._id},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
      
    );
    res.status(200).json({message: `Sucessfully login as ${validCustomer.username}` , token: jwtToken});
  } catch (error) {
    return next(error);
  }
};

export const loginAgent = async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const validAgent = await Agent.findOne({ username });
      if (!validAgent) {
        return next(errorHandler(404, "Invalid username or pasword"));
      }
      //Agent do exist, now check the acccount lock status
      if (validAgent.accountLocked) {
        const curTime = new Date();
        const lockDuration = 5 * 60 * 1000;
        const unlockTime = new Date(
          validAgent.lockedAt.getTime() + lockDuration
        );
  
        // Check if it's time to unlock the account
        if (curTime >= unlockTime) {
          // Reset login attempt counter and then unlock the account
          validAgent.loginAttempts = 0;
          validAgent.accountLocked = false;
          //Save info back to database
          await validAgent.save();
        } else {
          const remainingTime = Math.ceil((unlockTime - curTime) / 1000); // Remaining time in seconds
          return next(
            errorHandler(
              403,
              `Account is locked. Please try again in ${remainingTime} seconds`
            )
          );
        }
      }
      const validPassword = bcryptjs.compareSync(
        password,
        validAgent.password
      );
      if (!validPassword) {
          validAgent.loginAttempts += 1;
          if (validAgent.loginAttempts >= 5)
          {
              validAgent.accountLocked = true;
              validAgent.lockedAt = new Date();
          }
          await validAgent.save();
        return next(errorHandler(401, "Invalid username or password"));
      }
      const jwtToken = jwt.sign(
        { id: validAgent._id},
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
        
      );
      res.status(200).json({message: `Sucessfully login as ${validAgent.username}` , token: jwtToken});
    } catch (error) {
      return next(error);
    }
  };