import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true, // Assuming each user should have a unique Clerk ID
    },
    name: {
      type: String,
      required: true,
      trim: true, // Trimming whitespace
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    photo: {
      type: String,
      default: null, // Use null instead of string 'null' for clarity
    },
    firstName: {
      type: String,
      default: '',
      trim: true, // Optionally trim whitespace
    },
    lastName: {
      type: String,
      default: '',
      trim: true, // Optionally trim whitespace
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
