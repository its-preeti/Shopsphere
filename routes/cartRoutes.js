 id="4sq9i0"
const express =
require("express");

const router =
express.Router();

const {

  addToCart,

  getCart,

  removeCartItem,

} = require(
  "../controllers/cartController"
);

const {

  protect,

} = require(
  "../middleware/authMiddleware"
);

// ======================
// ADD TO CART
// ======================

router.post(
  "/add",
  protect,
  addToCart
);

// ======================
// GET USER CART
// ======================

router.get(
  "/",
  protect,
  getCart
);

// ======================
// REMOVE CART ITEM
// ======================

router.delete(
  "/remove/:id",
  protect,
  removeCartItem
);

module.exports =
router;

