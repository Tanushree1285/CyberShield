import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

const api = axios.create({ baseURL: API_BASE });

export interface Article {
  id: string;
  title: string;
  description: string;
  type: "advisory" | "high_profile" | "awareness";
  country: string;
  published_date: string;
  source: string;
  url: string;
}

export interface Portal {
  id: string;
  name: string;
  url: string;
  description: string;
  country: string;
}

export interface Helpline {
  id: string;
  name: string;
  phone: string;
  description: string;
  country: string;
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  country: string;
}

export interface Attack {
  id: number;
  country: string;
  region: string;
  city: string;
  attack_type: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  source: string;
  status: string;
}

/** Articles API */
export const articleApi = {
  getAll: (params?: { country?: string; type?: string; sort?: string; page?: number; per_page?: number }) =>
    api.get("/articles", { params }),
  getById: (id: string) => api.get(`/articles/${id}`),
  refresh: () => api.post("/articles/refresh"),
  create: (data: Partial<Article>) => api.post("/articles", data),
  update: (id: string, data: Partial<Article>) => api.put(`/articles/${id}`, data),
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
  getById: (id: string) => api.get(`/guides/${id}`),
  create: (data: any) => api.post("/guides", data),
  update: (id: string, data: any) => api.put(`/guides/${id}`, data),
  delete: (id: string) => api.delete(`/guides/${id}`),
};

/** Attack/Threat Intelligence API */
export const attackApi = {
  getAttacks: (country?: string) => api.get("/attacks", { params: { country } }),
  getThreatLevel: (country?: string) => api.get("/attacks/threat-level", { params: { country } }),
  getTrends: (country?: string, period?: string) => api.get("/attacks/trends", { params: { country, period } }),
  simulate: (country: string) => api.post("/attacks/simulate", { country }),
};

/** Dashboard API */
export const dashboardApi = {
  getStats: (country?: string) => api.get("/dashboard", { params: { country } }), // Mocked or backend-supported
  getDistribution: () => api.get("/dashboard/distribution"),
};

/** Chatbot API */
export const chatbotApi = {
  sendMessage: (message: string) => api.post("/chatbot", { message }),
};

