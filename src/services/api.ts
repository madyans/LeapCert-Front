import axios, { AxiosInstance, AxiosResponse } from "axios";
import { redirect } from 'next/navigation';

const api: AxiosInstance = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
    timeout: 90000,
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
