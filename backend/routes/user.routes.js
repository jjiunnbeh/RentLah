import express from "express";

import { changePassAgent, changePassCustomer, updateProfiePic } from "../controllers/user.controller.js";




const router = express.Router();


// router.post("/changepass-customer", changePassCustomer);
// router.post("/changepass-agent", changePassAgent);
router.put("/update/profilepic", updateProfiePic);


export default router;
