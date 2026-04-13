import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from 'js-cookie';

const authToken = Cookies.get("accessToken");
const baseURL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

const api: AxiosInstance = axios.create({
    baseURL,
    // Public endpoints (catalog) must work across browsers without
    // requiring third-party cookie credentials.
    withCredentials: false,
    timeout: 90000,
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
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
