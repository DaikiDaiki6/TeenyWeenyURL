import axiosInstance from "./axios";

export const AuthService = {
    register: (userData) => axiosInstance.post("/api/Auth/register", userData),
    login: (credentials) => axiosInstance.post("/api/Auth/login", credentials),
}

export const ShortUrlsService = {
    createUrl: (createUrlData) => axiosInstance.post("/api/ShortUrls/create-twurl", createUrlData),
    getAllUrls: () => axiosInstance.get("/api/ShortUrls/all-urls"),
    deleteUrl: (id) => axiosInstance.delete(`/api/ShortUrls/${id}`),
};

export const UserService = {
    editUser: (userData) => axiosInstance.patch("/api/User/profile", userData),
    deleteUser: () => axiosInstance.delete("/api/User/profile"),
};

export const RedirectionService = {
    redirect: (shortCode) => axiosInstance.get(`/${shortCode}`),
}