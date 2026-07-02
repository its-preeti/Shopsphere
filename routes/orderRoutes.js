const express =
require("express");

const router =
express.Router();

const {
createOrder,
getMyOrders,
} = require(
"../controllers/orderController"
);

const {
protect,
} = require(
"../middleware/authMiddleware"
);

// CREATE ORDER

router.post(
"/create",
protect,
createOrder
);

// GET MY ORDERS

router.get(
"/myorders",
protect,
getMyOrders
);

module.exports =
router;