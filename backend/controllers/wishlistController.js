
const Wishlist =
require("../models/Wishlist");

// ======================
// ADD TO WISHLIST
// ======================

const addToWishlist =
async (req, res) => {

  try {

    const { product } =
    req.body;

    const item =
    await Wishlist.create({

      user:
      req.user.id,

      product,

    });

    res.status(201).json({

      message:
      "Added To Wishlist ❤️",

      item,

    });

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};

// ======================
// GET WISHLIST
// ======================

const getWishlist =
async (req, res) => {

  try {

    const wishlist =
    await Wishlist.find({

      user:
      req.user.id,

    }).populate("product");

    res.status(200).json(
      wishlist
    );

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};

// ======================
// REMOVE FROM WISHLIST
// ======================

const removeWishlistItem =
async (req, res) => {

  try {

    await Wishlist.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      message:
      "Removed From Wishlist ❌",

    });

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};

module.exports = {

  addToWishlist,

  getWishlist,

  removeWishlistItem,

};

