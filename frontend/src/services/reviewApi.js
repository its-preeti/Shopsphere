import API from "./api";

// ADD REVIEW

export const addReview =
async (data) => {

const response =
await API.post(

"/reviews/add",

data

);

return response.data;

};

// GET PRODUCT REVIEWS

export const getReviews =
async (productId) => {

const response =
await API.get(

`/reviews/${productId}`

);

return response.data;

};

