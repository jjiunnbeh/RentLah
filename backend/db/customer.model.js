import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
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
    profilepic: {
      data: Buffer,
      contentType: String, // e.g xxx.png
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
