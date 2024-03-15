import { hash } from "bcrypt";
import Customer from "../db/customer.model.js";
import Agent from "../db/agent.model.js"
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";

export const registerCustomer = async (req, res, next) =>
{
    const {username, email, password, phoneNo}=req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newCustomer = new Customer({username, email, password: hashedPassword, phoneNo});
    try {
        await newCustomer.save();
        res.status(201).json(`${newCustomer.username} 's account is created sucessfully`);
    } catch(error)
    {
       next(errorHandler(500, error.message));
    }
}

export const registerAgent = async (req, res, next) =>
{
    const {username, email, password, phoneNo, agentFullName, agentRegNo, estateCompanyName}=req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newAgent = new Agent({username, email, password: hashedPassword, phoneNo, agentFullName, agentRegNo, estateCompanyName});
    try {
        await newAgent.save();
        res.status(201).json(`${newAgent.username} 's account is created sucessfully`);
    } catch(error)
    {
       next(errorHandler(500, error.message));
    }
}


