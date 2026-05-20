import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from 'js-cookie';

const baseURL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

const api: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 90000,
});

api.interceptors.request.use((config) => {
    const authToken = Cookies.get("accessToken");
    config.headers = config.headers ?? {};

    if (authToken) {
        if (typeof config.headers.set === "function") {
            config.headers.set("Authorization", `Bearer ${authToken}`);
        } else {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
    } else {
        if (typeof config.headers.delete === "function") {
            config.headers.delete("Authorization");
        } else if (config.headers.Authorization) {
            delete config.headers.Authorization;
        }
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

        if (error.response === "Necessario informar o endereço da visita") {
            return error.response as AxiosResponse;
        }

        return Promise.reject(error.response);
    }
);

export default api;
