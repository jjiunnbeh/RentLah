import express from "express";
import {registerCustomer, registerAgent, loginCustomer, loginAgent} from "../controllers/auth.controller.js"
import {signup, getbill } from '../controllers/auth.controller.js'

const router = express.Router();



/** HTTP Reqeust */
router.post('/user/signup', signup);
router.post('/product/getbill', getbill);
router.post("/register-customer", registerCustomer);
router.post("/register-agent", registerAgent);
router.post("/login-agent", loginAgent);
router.post("/login-customer", loginCustomer);


export default router;

