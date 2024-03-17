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
    phoneNo:{
      type:String,
      required:true,
      unique:true
  },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    accountLocked:
    {
      type:Boolean,
      default:false
    },
    lockedAt:
    {
      type:Date,
      default:null
    },
    profilePic: {
      data: Buffer,
      contentType: String, // e.g xxx.png
    },
    agentFullName:
    {
      type:String,
      required:true
    },
    agentRegNo:
    {
      type:String,
      uppercase:true,
      required:true,
      unique:true
    },
    estateCompanyName:
    {
      type:String,
      required:true
    },
    userType:
    {
      type:String,
      default:"Agent",
      unmodifiable:true
    }
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", agentSchema);
export default Agent;
