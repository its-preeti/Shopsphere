id="8m0j0i"
const express =
require("express");

const router =
express.Router();

const {

  addToWishlist,

  getWishlist,

  removeWishlistItem,

} = require(
  "../controllers/wishlistController"
);

const {

  protect,

} = require(
  "../middleware/authMiddleware"
);

// ======================
// ADD TO WISHLIST
// ======================

router.post(
  "/add",
  protect,
  addToWishlist
);

// ======================
// GET WISHLIST
// ======================

router.get(
  "/",
  protect,
  getWishlist
);

// ======================
// REMOVE FROM WISHLIST
// ======================

router.delete(
  "/remove/:id",
  protect,
  removeWishlistItem
);

module.exports =
router;

