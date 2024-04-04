import express from "express";

import { changePassAgent, changePassCustomer, updateAgent, updateCustomer, updateProfiePic ,resetPassword} from "../controllers/user.controller.js";




const router = express.Router();


// router.post("/changepass-customer", changePassCustomer);
// router.post("/changepass-agent", changePassAgent);
router.put("/update/profilepic", updateProfiePic);
router.put("/update/Customer", updateCustomer);
router.put("/update/Agent", updateAgent);
router.put("/resetPassword", resetPassword)



export default router;
