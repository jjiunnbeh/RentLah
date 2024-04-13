import express, { Router } from "express";

import { createListing, deleteListing, editListing, fullSearch, getAgentListings, getAllListings, getListing, getWatchlistListings, searchListingByNameandAddress,getHomeListings } from "../controllers/listing.controller.js";



const router = express.Router();

router.post("/create", createListing);
router.get("/get-listing/:id", getListing);
router.get("/get-listings" ,getAllListings);
router.get("/home/get-listings" ,getHomeListings);
router.get("/get-watchlist/:id", getWatchlistListings);
router.get("/get-managed-listings", getAgentListings);
router.delete("/delete-listing/:id", deleteListing);
router.get("/search/:searchterm", searchListingByNameandAddress);
router.get("/search/:searchTerm/:bedroom/:bathroom/:lowerPrice/:upperPrice", fullSearch);
router.put("/edit-listing/:id", editListing);




export default router;