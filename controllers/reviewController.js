 id="p7m2qz"
const Review =
require("../models/Review");

// ======================
// ADD REVIEW
// ======================

const addReview =
async (req, res) => {

  try {

    const {

      product,

      rating,

      comment,

    } = req.body;

    const review =
    await Review.create({

      user:
      req.user.id,

      product,

      rating,

      comment,

    });

    res.status(201).json({

      message:
      "Review Added ✅",

      review,

    });

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};

// ======================
// GET PRODUCT REVIEWS
// ======================

const getProductReviews =
async (req, res) => {

  try {

    const reviews =
    await Review.find({

      product:
      req.params.productId,

    }).populate(
      "user",
      "name email"
    );

    res.status(200).json(
      reviews
    );

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};

module.exports = {

  addReview,

  getProductReviews,

};

