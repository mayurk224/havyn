import assert from "node:assert/strict";
import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import productModel from "../models/product.model.js";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.controller.js";

const createResponse = () => ({
  statusCode: 200,
  body: null,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(payload) {
    this.body = payload;
    return this;
  },
});

const runTest = async (name, fn) => {
  try {
    await fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
};

await runTest("addToWishlist returns canonical wishlist ids and avoids duplicates", async () => {
  const userId = new mongoose.Types.ObjectId().toString();
  const existingId = new mongoose.Types.ObjectId();
  const productId = existingId.toString();
  const req = { params: { productId }, user: { id: userId } };
  const res = createResponse();

  const originalProductFindById = productModel.findById;
  const originalUserFindById = userModel.findById;

  productModel.findById = async () => ({ _id: productId });
  userModel.findById = async () => ({
    wishlist: [existingId],
    save: async () => {},
  });

  try {
    await addToWishlist(req, res);
  } finally {
    productModel.findById = originalProductFindById;
    userModel.findById = originalUserFindById;
  }

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.message, "Product already in wishlist");
  assert.deepEqual(res.body.data, [productId]);
});

await runTest("addToWishlist appends a new product id", async () => {
  const userId = new mongoose.Types.ObjectId().toString();
  const existingId = new mongoose.Types.ObjectId();
  const nextId = new mongoose.Types.ObjectId().toString();
  const req = { params: { productId: nextId }, user: { id: userId } };
  const res = createResponse();

  const user = {
    wishlist: [existingId],
    async save() {},
  };

  const originalProductFindById = productModel.findById;
  const originalUserFindById = userModel.findById;

  productModel.findById = async () => ({ _id: nextId });
  userModel.findById = async () => user;

  try {
    await addToWishlist(req, res);
  } finally {
    productModel.findById = originalProductFindById;
    userModel.findById = originalUserFindById;
  }

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body.data, [existingId.toString(), nextId]);
});

await runTest("removeFromWishlist is idempotent and returns updated ids", async () => {
  const userId = new mongoose.Types.ObjectId().toString();
  const keepId = new mongoose.Types.ObjectId();
  const removeId = new mongoose.Types.ObjectId().toString();
  const req = { params: { productId: removeId }, user: { id: userId } };
  const res = createResponse();

  const user = {
    wishlist: [keepId, new mongoose.Types.ObjectId(removeId)],
    async save() {},
  };

  const originalUserFindById = userModel.findById;
  userModel.findById = async () => user;

  try {
    await removeFromWishlist(req, res);
  } finally {
    userModel.findById = originalUserFindById;
  }

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body.data, [keepId.toString()]);
});

await runTest("getWishlist returns populated products", async () => {
  const userId = new mongoose.Types.ObjectId().toString();
  const req = { user: { id: userId } };
  const res = createResponse();
  const wishlist = [{ _id: new mongoose.Types.ObjectId().toString(), title: "Bag" }];

  const originalUserFindById = userModel.findById;
  userModel.findById = () => ({
    populate: async () => ({ wishlist }),
  });

  try {
    await getWishlist(req, res);
  } finally {
    userModel.findById = originalUserFindById;
  }

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body.data, wishlist);
});

console.log("Wishlist controller checks completed.");
