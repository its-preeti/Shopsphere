
const express =
require("express");

const router =
express.Router();

const {

  addReview,

  getProductReviews,

} = require(
  "../controllers/reviewController"
);

const {

  protect,

} = require(
  "../middleware/authMiddleware"
);

// ======================
// ADD REVIEW
// ======================

router.post(
  "/add",
  protect,
  addReview
);

// ======================
// GET PRODUCT REVIEWS
// ======================

router.get(
  "/:productId",
  getProductReviews
);

module.exports =
router;

