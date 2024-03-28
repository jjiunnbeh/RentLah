import express from "express";
import {test} from "../controllers/user.controller.js";




const router = express.Router();


router.post("/changepass-customer", changePassCustomer);
router.post("/changepass-agent", changePassAgent);

export default router;
