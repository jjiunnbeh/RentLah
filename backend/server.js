import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
// import login from './functions/login.js';
// import register from "./functions/register.js";
import customerRouter from "./routes/customer.routes.js";
import { error } from 'console';
import authRouter from "./routes/auth.route.js";

// import propertyListingsRouter from './function/propertyListings.js'; // Import the property listings router


dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{console.log("Connected to DB")}).catch((error)=>{console.log("Error: " , error)});

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(cors({ origin: ['http://localhost:5173','http://localhost:5174'] }));
app.use(bodyParser.json());

// Login Endpoint
  // app.post('/loginSubmit', async (req, res) => {
  //   try {
  //     const {username, password, userType} = req.body;
  //     const response = await login(username, password, userType); // Pass request body and (optional) users data\
  //     res.json(response);
  //   } catch (error) {
  //     console.error(error);
  //     res.sendStatus(500).send({ message: 'Internal server error' });
  //   }
  // });

// // Register endpoint
//   app.post('/registerSubmit?Customer', async(req, res)=>{
//     try{
//     const {username, email, phoneNumber, password, userType} = req.body;
//     const response = await register(username, email, phoneNumber, password, userType);
//     res
//     .status(200)
//     .json(response);
//     }
//     catch(error)
//     {
//         console.error(error);
//         res.status(500).send({ message: 'Internal server error' });
//     }
//   })

// // Mount the property listings router to the /api path
// app.use('/api', propertyListingsRouter);


app.use("/api/customer", customerRouter);
//This is the register route// Use Postman to try http://localhost:3000/api/auth/registerAgent or registerCustomer
app.use('/api/auth', authRouter);
//Middleware
app.use((error, req, res, next)=>
{
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  return res.status(statusCode).json(
    {
      success:false,
      statusCode,
      message,
    }
  );
});

app.get('/api/users', (req, res) => {
    res.json({})});



app.listen(port, ()=>{console.log(`Server is listening at port ${port}`)});


