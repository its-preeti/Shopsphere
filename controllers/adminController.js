 id="m5q2zt"
const Product =
require("../models/Product");

const User =
require("../models/User");

const Order =
require("../models/Order");

// ======================
// GET ALL USERS
// ======================

const getAllUsers =
async (req, res) => {

  try {

    const users =
    await User.find();

    res.status(200).json(
      users
    );

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};

// ======================
// GET ALL ORDERS
// ======================

const getAllOrders =
async (req, res) => {

  try {

    const orders =
    await Order.find()
    .populate("user");

    res.status(200).json(
      orders
    );

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};

// ======================
// DELETE PRODUCT
// ======================

const deleteProduct =
async (req, res) => {

  try {

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      message:
      "Product Deleted ❌",

    });

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};

module.exports = {

  getAllUsers,

  getAllOrders,

  deleteProduct,

};

