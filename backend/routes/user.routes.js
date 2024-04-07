import express from "express";

import { changePass, updateAgent, updateCustomer, updateProfiePic ,resetPassword} from "../controllers/user.controller.js";




const router = express.Router();


router.post("/change-password", changePass);
router.put("/update/profilepic", updateProfiePic);
router.put("/update/Customer", updateCustomer);
router.put("/update/Agent", updateAgent);
router.put("/resetPassword", resetPassword)



export default router;
