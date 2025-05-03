import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';

const authToken = Cookies.get("authToken");

const api: AxiosInstance = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
    timeout: 90000,
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            redirect("/"); // Redireciona para a página de login
        }

        if (error.response === "Necessario informar o endereço da visita") {
            return error.response as AxiosResponse;
        }

        return Promise.reject(error.response);
    }
);

export default api;
