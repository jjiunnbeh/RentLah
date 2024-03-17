
import Agent from "./agent.model";


import mongoose from "mongoose";



const propertySchema = new Schema(
  {
    // Other properties of your property schema

    // Reference to the Agent model
    agent: {
      type: Schema.Types.ObjectId,  
      ref: "Agent", // Reference to the Agent model
      required: true
    },

    // Other properties of your property schema
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;
