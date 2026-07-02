const Order =
require("../models/Order");

const Cart =
require("../models/Cart");

// ======================
// CREATE ORDER
// ======================

const createOrder =
async (req, res) => {

try {

const cartItems =
await Cart.find({

user:
req.user.id,

}).populate("product");

if (
cartItems.length === 0
) {

return res.status(400).json({

message:
"Cart Is Empty",

});

}

const totalPrice =
cartItems.reduce(

(total, item) =>

total +
item.product.price *
item.quantity,

0
);

const order =
await Order.create({

user:
req.user.id,

products:
cartItems.map((item) => ({

product:
item.product._id,

quantity:
item.quantity,

})),

totalPrice,

});

// CLEAR CART

await Cart.deleteMany({

user:
req.user.id,

});

res.status(201).json({

message:
"Order Placed ✅",

order,

});

} catch (error) {

res.status(500).json({

message:
error.message,

});

}

};

// ======================
// GET MY ORDERS
// ======================

const getMyOrders =
async (req, res) => {

try {

const orders =
await Order.find({

user:
req.user.id,

}).populate(
"products.product"
);

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

module.exports = {

createOrder,

getMyOrders,

};