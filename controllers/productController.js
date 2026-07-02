const Product =
require("../models/Product");


// GET ALL PRODUCTS

const getProducts =
async (req, res) => {

  try {

    const products =
    await Product.find();

    res.status(200).json(
      products
    );

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};


// ADD PRODUCT

const addProduct =
async (req, res) => {

  try {

    const {
      title,
      price,
      image,
      description,
      category,
      stock,
    } = req.body;

    const product =
    await Product.create({

      title,
      price,
      image,
      description,
      category,
      stock,

    });

    res.status(201).json({

      message:
      "Product Added ✅",

      product,

    });

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};


// GET SINGLE PRODUCT

const getSingleProduct =
async (req, res) => {

  try {

    const product =
    await Product.findById(
      req.params.id
    );

    if (!product) {

      return res.status(404).json({

        message:
        "Product Not Found",

      });

    }

    res.status(200).json(
      product
    );

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};


// DELETE PRODUCT

const deleteProduct =
async (req, res) => {

  try {

    const product =
    await Product.findById(
      req.params.id
    );

    if (!product) {

      return res.status(404).json({

        message:
        "Product Not Found",

      });

    }

    await product.deleteOne();

    res.status(200).json({

      message:
      "Product Deleted ✅",

    });

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }

};


module.exports = {

  getProducts,

  addProduct,

  getSingleProduct,

  deleteProduct,

};