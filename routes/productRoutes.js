const express =
require("express");

const router =
express.Router();

const {

  getProducts,

  addProduct,

  getSingleProduct,

  deleteProduct,

} = require(
"../controllers/productController"
);


// GET ALL

router.get(
  "/",
  getProducts
);


// GET SINGLE

router.get(
  "/:id",
  getSingleProduct
);


// ADD PRODUCT

router.post(
  "/add",
  addProduct
);


// DELETE PRODUCT

router.delete(
  "/:id",
  deleteProduct
);


module.exports =
router;