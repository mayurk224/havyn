import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Customer", "Vendor", "Admin"],
      default: "Customer",
    },

    vendorDetails: {
      storeName: {
        type: String,
        trim: true,
        unique: true,
        sparse: true,
      },
      storeDescription: {
        type: String,
      },
      stripeAccountId: {
        type: String,
      },
      isApproved: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("users", userSchema);

export default userModel;
