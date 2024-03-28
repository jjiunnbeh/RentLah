import express from "express";

import { changePassAgent, changePassCustomer } from "../controllers/user.controller.js";




const router = express.Router();


router.post("/changepass-customer", changePassCustomer);
router.post("/changepass-agent", changePassAgent);

export default router;
