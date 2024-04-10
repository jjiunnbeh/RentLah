import express from "express";

import { changePass, updateAgent, updateCustomer, updateProfiePic ,resetPassword, getAgent, addToWatchList, deleteFromWatchList} from "../controllers/user.controller.js";




const router = express.Router();


router.post("/change-password", changePass);
router.put("/update/profilepic", updateProfiePic);
router.put("/update/Customer", updateCustomer);
router.put("/update/Agent", updateAgent);
router.put("/resetPassword", resetPassword);
router.get("/get-agent/:username", getAgent);
router.put("/add-to-watchlist/:id", addToWatchList);
router.delete("/delete-from-watchlist/:id/:userid", deleteFromWatchList);



export default router;
