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
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
const ManagedListing = mongoose.model("ManagedListing", propertySchema);
const WatchList = mongoose.model("WatchList", propertySchema);
export default { Property, ManagedListing, WatchList };
