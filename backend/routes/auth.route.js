import express from "express";
import {registerCustomer, registerAgent, loginCustomer, loginAgent, forgetPassword, resetPassword} from "../controllers/auth.controller.js"
import { sendEmail } from '../controllers/auth.controller.js'

const router = express.Router();



/** HTTP Reqeust */

router.post('/forget-pass/sendemail', sendEmail);
router.post('/forget-pass', forgetPassword);
router.post("/register-customer", registerCustomer);
router.post("/register-agent", registerAgent);
router.post("/login-agent", loginAgent);
router.post("/login-customer", loginCustomer);
router.post("/reset-pass/agent", resetPassword);
router.post("/reset-pass/customer", resetPassword);
export default router;

