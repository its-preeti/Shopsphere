id="k8v4rp"
const express =
require("express");

const router =
express.Router();

const {

  getAllUsers,

  getAllOrders,

  deleteProduct,

} = require(
  "../controllers/adminController"
);

const protect =
require(
  "../middleware/authMiddleware"
);

const admin =
require(
  "../middleware/adminMiddleware"
);

// GET ALL USERS

router.get(
  "/users",
  protect,
  admin,
  getAllUsers
);

// GET ALL ORDERS

router.get(
  "/orders",
  protect,
  admin,
  getAllOrders
);

// DELETE PRODUCT

router.delete(
  "/product/:id",
  protect,
  admin,
  deleteProduct
);

module.exports =
router;

