import express, { Router } from "express";
<<<<<<< HEAD
import { createListing, deleteListing, editListing, fullSearch, getAgentListings, getAllListings, getListing, getWatchlistListings, searchListingByNameandAddress } from "../controllers/listing.controller.js";
=======
import { createListing, deleteListing, fullSearch, getAgentListings, getAllListings, getListing, getWatchlistListings, searchListingByNameandAddress } from "../controllers/listing.controller.js";
import { deleteFromWatchList } from "../controllers/user.controller.js";
>>>>>>> 3e109d90448ac94a3f6835fecebe6bcb98c007bd


const router = express.Router();

router.post("/create", createListing);
router.get("/get-listing/:id", getListing);
router.get("/get-listings" ,getAllListings);
router.get("/get-watchlist/:id", getWatchlistListings);
router.get("/get-managed-listings", getAgentListings);
router.delete("/delete-listing/:id", deleteListing);
router.get("/search/:searchterm", searchListingByNameandAddress);
router.get("/search/:searchTerm/:bedroom/:bathroom/:lowerPrice/:upperPrice", fullSearch);
router.put("/edit-listing/:id", editListing);




export default router;