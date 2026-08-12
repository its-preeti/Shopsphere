const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PRODUCT
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    console.log("CREATE PRODUCT BODY:", req.body);
    console.log("CREATE PRODUCT FILE:", req.file);

    const {
      name,
      description,
      price,
      category,
      stock,
    } = req.body;

    // Check image
    if (!req.file) {
      return res.status(400).json({
        message: "Product image is required",
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "shopsphere/products",
    });

    console.log("CLOUDINARY URL:", result.secure_url);

    // Create product
    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      imageUrl: result.secure_url,
    });

    console.log("PRODUCT CREATED:", product);

    res.status(201).json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const {
      name,
      description,
      price,
      category,
      stock,
    } = req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    // New image
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "shopsphere/products",
      });

      product.imageUrl = result.secure_url;
    }

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product removed successfully",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};