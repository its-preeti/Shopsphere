
import axios from "axios";

const API = axios.create({

  baseURL:
  "https://shopsphere-backend-nl6r.onrender.com",

});

// TOKEN AUTO ADD

API.interceptors.request.use(

(config) => {

const userInfo =
localStorage.getItem(
"userInfo"
);

if (userInfo) {

const token =
JSON.parse(userInfo).token;

config.headers.Authorization =
`Bearer ${token}`;

}

return config;

}

);

export default API;

