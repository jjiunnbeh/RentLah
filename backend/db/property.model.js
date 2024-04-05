import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
      maxlength: 6,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    bedroom: {
      type: Number,
      required: true,
    },
    bathroom: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    agentRef: {
      type: String,
      required: true,
    },
    LATITUDE: 
    {
      type: Number,
    },
    LONGITUDE: {
      type: Number,
   },
  },
  { timestamps: true }
);

export const Property = mongoose.model("Property", propertySchema);
export const ManagedListing = mongoose.model("ManagedListing", propertySchema);
export const WatchList = mongoose.model("WatchList", propertySchema);

