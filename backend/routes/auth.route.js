import express from "express";
import {registerCustomer, registerAgent} from "../controllers/auth.controller.js"

const router = express.Router();

router.post("/registerCustomer", registerCustomer);
router.post("/registerAgent", registerAgent);

export default router;

