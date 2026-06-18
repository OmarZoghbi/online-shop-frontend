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

export async function getProducts() {
    const response = await api.get("/products");
    return response.data;
}

export async function createProduct(product) {
    const response = await api.post("/products", product);
    return response.data;
}

export async function updateProduct(id, product) {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
}

export async function deleteProduct(id) {
    await api.delete(`/products/${id}`);
}