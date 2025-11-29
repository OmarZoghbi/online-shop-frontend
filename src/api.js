import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

export default api;

import axios from "axios";

export async function getProducts() {
    const res = await axios.get("https://online-shop-backend-8v7u.onrender.com/products");
    return res.data;
}
