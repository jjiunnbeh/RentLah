import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import login from './function/login.js'

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());



  
  // Login Endpoint
  app.post('/loginSubmit', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
      const res = await login(username, password); // Pass request body and (optional) users data
      res.status(200).send({ message });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });


app.get('/api/users', (req, res) => {
    res.json({})});



app.listen(port, ()=>{console.log(`Server is listening at port ${port}`)});


