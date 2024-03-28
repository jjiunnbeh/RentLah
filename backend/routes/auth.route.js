import express from "express";
import {registerCustomer, registerAgent, loginCustomer, loginAgent} from "../controllers/auth.controller.js"
import { sendEmail } from '../controllers/auth.controller.js'

const router = express.Router();



/** HTTP Reqeust */

router.post('/product/getbill', sendEmail);
router.post("/register-customer", registerCustomer);
router.post("/register-agent", registerAgent);
router.post("/login-agent", loginAgent);
router.post("/login-customer", loginCustomer);
export default router;

