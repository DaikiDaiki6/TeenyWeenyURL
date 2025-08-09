import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "/api",
    timeout: 10000,
    headers: {
        "Content-Type" : "application/json",
    },
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);

        if(error.response?.status == 401){
            console.log("Token expired or invalid, clearing from localStorage.");
            localStorage.removeItem("token");

            if(window.location.pathname !== "/"){
                window.location.href = "/";
            }
        }

        return Promise.reject(error)
    }
);

export default axiosInstance;