import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;




app.get('/api/users', (req, res) => {
    res.json({})});



app.listen(port, ()=>{console.log(`Server is listening at port ${port}`)});


