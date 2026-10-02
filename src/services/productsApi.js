import API from "./api";

// GET ALL PRODUCTS

export const getProducts =
async () => {

const response =
await API.get("/products");

return response.data;

};

// GET SINGLE PRODUCT

export const getSingleProduct =
async (id) => {

const response =
await API.get(
`/products/${id}`
);

return response.data;

};

// CREATE PRODUCT

export const createProduct =
async (productData) => {

const response =
await API.post(

"/products",

productData

);

return response.data;

};

