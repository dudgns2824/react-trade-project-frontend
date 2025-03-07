import axios from 'axios';
axios.defaults.timeout = 10000;

const axiosClient = axios.create({
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        AUTHORIZATION: 'Bearer ' + accessToken
    },
    withCredentials: true
})

axiosClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken; // Zustand에서 토큰 가져오기
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
        if (error.response?.status === 401) {
            console.warn("JWT 만료 - 로그아웃 처리");
            useAuthStore.getState().clearAccessToken();
        }
        return Promise.reject(error);
    }
);

export { axiosClient };