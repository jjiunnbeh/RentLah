import express, { Router } from "express";
import { createListing, deleteListing, fullSearch, getAgentListings, getAllListings, getListing, getWatchlistListings, searchListingByNameandAddress } from "../controllers/listing.controller.js";


const router = express.Router();

router.post("/create", createListing);
router.get("/get-listing/:id", getListing);
router.get("/get-listings" ,getAllListings);
router.get("/get-watchlist", getWatchlistListings);
router.get("/get-managed-listings", getAgentListings);
router.delete("/delete-listing/:id", deleteListing);
router.get("/search/:searchterm", searchListingByNameandAddress);
router.get("/search/:searchTerm/:bedroom/:bathroom/:lowerPrice/:upperPrice", fullSearch);
router.put("edit-listing/:id");




export default router;