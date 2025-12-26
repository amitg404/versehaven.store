import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5005";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("versehaven_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Product types
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string;
  category: string;
  tags: string;
  stock: number;
  isAvailable: boolean;
  createdAt: string;
}

// Auth
export const authApi = {
  register: (data: { email?: string; mobile?: string; password: string; name?: string }) =>
    api.post("/api/auth/register", data),
  login: (data: { email?: string; mobile?: string; password: string }) =>
    api.post("/api/auth/login", data),
  getProfile: () => api.get("/api/auth/profile"),
};

// Products
export const productApi = {
  getAll: (params?: { category?: string; tag?: string; search?: string; sort?: string; limit?: number; offset?: number }) =>
    api.get<{ products: Product[]; total: number }>("/api/products", { params }),
  getById: (id: string) => api.get<{ product: Product }>(`/api/products/${id}`),
  getByTags: (tags: string[]) => api.post<{ products: Product[] }>("/api/products/by-tags", { tags }),
  getCategories: () => api.get<{ categories: string[] }>("/api/products/categories"),
};

// Cart
export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  customImage?: string;
  product?: Product;
}

export const cartApi = {
  get: () => api.get<{ items: CartItem[]; total: number }>("/api/cart"),
  add: (productId: string, quantity?: number, customImage?: string) =>
    api.post("/api/cart/add", { productId, quantity, customImage }),
  update: (id: string, quantity: number) => api.put(`/api/cart/${id}`, { quantity }),
  remove: (id: string) => api.delete(`/api/cart/${id}`),
  clear: () => api.delete("/api/cart"),
};

// Orders
export const orderApi = {
  create: (shippingFee?: number) => api.post("/api/orders", { shippingFee }),
  getAll: () => api.get("/api/orders"),
  getById: (id: string) => api.get(`/api/orders/${id}`),
};

// Payment
export const paymentApi = {
  createOrder: (orderId: string) => api.post("/api/payment/create-order", { orderId }),
  verify: (data: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string; orderId: string }) =>
    api.post("/api/payment/verify", data),
};

// Upload
export const uploadApi = {
  custom: (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    return api.post("/api/upload/custom", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default api;
