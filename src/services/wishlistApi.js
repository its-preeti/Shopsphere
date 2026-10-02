import API from "./api";

// ADD TO WISHLIST

export const addToWishlist =
async (data) => {

const response =
await API.post(

"/wishlist/add",

data

);

return response.data;

};

// GET WISHLIST

export const getWishlist =
async () => {

const response =
await API.get(
"/wishlist"
);

return response.data;

};

// REMOVE WISHLIST ITEM

export const removeWishlist =
async (id) => {

const response =
await API.delete(

`/wishlist/remove/${id}`

);

return response.data;

};

