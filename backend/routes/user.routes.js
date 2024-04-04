import express from "express";

import { changePassAgent, changePassCustomer, updateAgent, updateCustomer, updateProfiePic } from "../controllers/user.controller.js";




const router = express.Router();


// router.post("/changepass-customer", changePassCustomer);
// router.post("/changepass-agent", changePassAgent);
router.put("/update/profilepic", updateProfiePic);
router.put("/update/Customer", updateCustomer);
router.put("/update/Agent", updateAgent);



export default router;
