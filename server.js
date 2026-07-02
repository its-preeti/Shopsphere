require("dotenv").config();

const express =
require("express");

const cors =
require("cors");

const connectDB =
require("./config/db");

const authRoutes =
require("./routes/authRoutes");

const productRoutes =
require("./routes/productRoutes");

const cartRoutes =
require("./routes/cartRoutes");

const wishlistRoutes =
require("./routes/wishlistRoutes");

const orderRoutes =
require("./routes/orderRoutes");

const reviewRoutes =
require("./routes/reviewRoutes");

const app = express();

// DB

connectDB();

// MIDDLEWARE

app.use(cors());

app.use(express.json());

// TEST ROUTE

app.get("/", (req, res) => {

  res.send(
    "ShopSphere API Running 🚀"
  );

});

// AUTH ROUTES

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/cart",
  cartRoutes
);

app.use(
  "/api/wishlist",
  wishlistRoutes
);
app.use(
  "/api/orders",
  orderRoutes
);
app.use(
  "/api/reviews",
  reviewRoutes
);
// PORT

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server Running On Port ${PORT}`
  );

});