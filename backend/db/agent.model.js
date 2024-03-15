import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    userType: {
      type: String,
      required: true,
    },
    profilepic: {
      data: Buffer,
      contentType: String, // e.g xxx.png
    },
    agentfullname:
    {
      type:String,
      required:true
    },
    agentregno:
    {
      type:String,
      uppercase:true,
      required:true,
      unique:true
    },
    estatecompanyname:
    {
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", customerSchema);
export default Agent;
