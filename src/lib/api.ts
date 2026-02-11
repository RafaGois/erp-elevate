import axios, { AxiosError, AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

// Instância configurada do axios
const api = axios.create({
  baseURL: "https://elevatepromedia.com/api",
});

// Interceptor para adicionar o header token em todas as requisições
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("elevate-token");
    if (token) {
      config.headers = config.headers || ({} as AxiosRequestHeaders);
      // Header "token" com o valor do bearer token (apenas o valor, sem prefixo "Bearer ")
      const rawToken = token.replace(/^Bearer\s+/i, "") || token;
      config.headers.token = rawToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros 401 (não autorizado)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      const url = error.config?.url ?? "";
      // Não desloga em 401 em rotas públicas (login, register, validate)
      const isPublicRoute =
        url.includes("/users/login") ||
        url.includes("/users/register") ||
        url.includes("/users/validate");
      if (!isPublicRoute) {
        Cookies.remove("elevate-auth", { path: "/" });
        Cookies.remove("elevate-token", { path: "/" });
        localStorage.removeItem("uid");
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
