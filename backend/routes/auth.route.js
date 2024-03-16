import express from "express";
import {registerCustomer, registerAgent, loginCustomer, loginAgent} from "../controllers/auth.controller.js"


const router = express.Router();

router.post("/registerCustomer", registerCustomer);
router.post("/registerAgent", registerAgent);
router.post("/loginAgent", loginAgent);
router.post("/loginCustomer", loginCustomer);

export default router;

