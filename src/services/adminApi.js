import API from "./api";

// GET ALL USERS

export const getUsers =
async () => {

const response =
await API.get(
"/admin/users"
);

return response.data;

};

// DELETE USER

export const deleteUser =
async (id) => {

const response =
await API.delete(

`/admin/users/${id}`

);

return response.data;

};

