import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId:{
      type:String,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    photo:{
      type:String,
      default:'null'
    },
    firstName : {
      type: String,
      default: ''
    },
    lastName : {
      type: String,
      default: ''
    },
    isTeamMember : {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;