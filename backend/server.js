import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
// import login from './functions/login.js';
// import register from "./functions/register.js";
import userRouter from "./routes/user.routes.js";
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

app.use("/api/user", userRouter);
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

// app.post('/forgot-password', (req, res) => {
//   const {email} = req.body;
//   UserModel.findOne({email: email})
//   .then(user => {
//       if(!user) {
//           return res.send({Status: "User not existed"})
//       } 
//       const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
//       var transporter = nodemailer.createTransport({
//           service: 'gmail',
//           auth: {
//             user: 'youremail@gmail.com',
//             pass: 'your password'
//           }
//         });
        
//         var mailOptions = {
//           from: 'youremail@gmail.com',
//           to: 'user email@gmail.com',
//           subject: 'Reset Password Link',
//           text: `http://localhost:5173/reset_password/${user._id}/${token}`
//         };
        
//         transporter.sendMail(mailOptions, function(error, info){
//           if (error) {
//             console.log(error);
//           } else {
//             return res.send({Status: "Success"})
//           }
//         });
//   })
// })

// app.post('/reset-password/:id/:token', (req, res) => {
//   const {id, token} = req.params
//   const {password} = req.body

//   jwt.verify(token, "jwt_secret_key", (err, decoded) => {
//       if(err) {
//           return res.json({Status: "Error with token"})
//       } else {
//           bcrypt.hash(password, 10)
//           .then(hash => {
//               UserModel.findByIdAndUpdate({_id: id}, {password: hash})
//               .then(u => res.send({Status: "Success"}))
//               .catch(err => res.send({Status: err}))
//           })
//           .catch(err => res.send({Status: err}))
//       }
//   })
// })

