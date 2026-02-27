import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

const api = axios.create({ baseURL: API_BASE });

/** Articles API */
export const articleApi = {
  getAll: (country?: string) => api.get("/articles", { params: { country } }),
  getById: (id: string) => api.get(`/articles/${id}`),
  create: (data: any) => api.post("/articles", data),
  update: (id: string, data: any) => api.put(`/articles/${id}`, data),
  delete: (id: string) => api.delete(`/articles/${id}`),
};

/** Helplines API */
export const helplineApi = {
  getAll: (country?: string) => api.get("/helplines", { params: { country } }),
  create: (data: any) => api.post("/helplines", data),
  update: (id: string, data: any) => api.put(`/helplines/${id}`, data),
  delete: (id: string) => api.delete(`/helplines/${id}`),
};

/** Portals API */
export const portalApi = {
  getAll: (country?: string) => api.get("/portals", { params: { country } }),
  create: (data: any) => api.post("/portals", data),
  update: (id: string, data: any) => api.put(`/portals/${id}`, data),
  delete: (id: string) => api.delete(`/portals/${id}`),
};

/** Guides API */
export const guideApi = {
  getAll: (country?: string) => api.get("/guides", { params: { country } }),
  create: (data: any) => api.post("/guides", data),
  update: (id: string, data: any) => api.put(`/guides/${id}`, data),
  delete: (id: string) => api.delete(`/guides/${id}`),
};

/** Dashboard API */
export const dashboardApi = {
  getStats: () => api.get("/dashboard"),
};

/** Chatbot API */
export const chatbotApi = {
  sendMessage: (message: string) => api.post("/chatbot", { message }),
};
