import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    // We store the exact choices, not the price or title
    variant: {
      size: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity cannot be less than 1"],
      default: 1,
    },
  },
  { _id: false },
); // We don't need a unique ID for each item row in the cart

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true, // One user = One cart document
      index: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true, // Useful for clearing out abandoned carts later
  },
);

const cartModel = mongoose.model("carts", cartSchema);

export default cartModel;
