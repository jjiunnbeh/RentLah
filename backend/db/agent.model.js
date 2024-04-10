import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      uppercase:true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      uppercase:true,
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
    profilepic: {
      type: String,
      default:"https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
    },
    agentname:
    {
      type:String,
      required:true,
      uppercase:true,
    },
    agentregnum:
    {
      type:String,
      uppercase:true,
      required:true,
      unique:true
    },
    userType:
    {
      type:String,
      default:"Agent",
      unmodifiable:true
    }
    ,
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", agentSchema);
export default Agent;
