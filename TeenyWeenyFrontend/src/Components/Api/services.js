import axiosInstance from "./axios";

export const AuthService = {
  register: (userData) => axiosInstance.post("/api/Auth/register", userData),
  login: (credentials) => axiosInstance.post("/api/Auth/login", credentials),
  authCheck: () => axiosInstance.get("/api/Auth/check"),
};

export const ShortUrlsService = {
  createUrl: (createUrlData) =>
    axiosInstance.post("/api/ShortUrls/create-twurl", createUrlData),
  getAllUrls: (page, pageSize) =>
    axiosInstance.get("/api/ShortUrls/all-urls", {
      params: {
        page: page,
        pageSize: pageSize,
      },
    }),
  deleteUrl: (id) => axiosInstance.delete(`/api/ShortUrls/${id}`),
  editUrl: (id, editData) =>
    axiosInstance.patch(`/api/ShortUrls/${id}`, editData),
  getUrlById: (id) => axiosInstance.get(`/api/ShortUrls/${id}`),
};

export const UserService = {
  editUser: (userData) => axiosInstance.patch("/api/User/profile", userData),
  deleteUser: () => axiosInstance.delete("/api/User/profile"),
};

export const RedirectionService = {
  redirect: (shortCode) => axiosInstance.get(`/${shortCode}`),
};
