import axios from "axios";
import { store } from "../store";
import { clearAccessToken } from "../store/auth/auth.slice";
axios.defaults.timeout = 10000;

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "https://vboong.com",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.warn("JWT 만료 - 로그아웃 처리");
            store.dispatch(clearAccessToken()); // Redux 상태 초기화
        }
        return Promise.reject(error);
    }
);

export { axiosClient };