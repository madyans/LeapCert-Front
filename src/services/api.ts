import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from 'js-cookie';

const baseURL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

const api: AxiosInstance = axios.create({
    baseURL,
    // Public endpoints (catalog) must work across browsers without
    // requiring third-party cookie credentials.
    withCredentials: false,
    timeout: 90000,
});

api.interceptors.request.use((config) => {
    const token = Cookies.get("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            if (typeof window !== "undefined") {
                const hasSession = !!Cookies.get("accessToken");
                if (hasSession && window.location.pathname !== "/login") {
                    window.location.assign("/login");
                }
            }
        }

        const data = error.response?.data;
        const message =
            typeof data === 'string' ? data : (data as { message?: string } | undefined)?.message;
        if (message === 'Necessario informar o endereço da visita') {
            return error.response as AxiosResponse;
        }

        return Promise.reject(error.response);
    }
);

export default api;