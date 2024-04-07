import express, { Router } from "express";
import { createListing, getAgentListings, getAllListings, getListing, getWatchlistListings } from "../controllers/listing.controller.js";


const router = express.Router();

router.post("/create", createListing);
router.get("/get-listing/:id", getListing);
router.get("/get-listings" ,getAllListings);
router.get("/get-watchlist", getWatchlistListings);
router.get("/get-managed-listings", getAgentListings);



export default router;