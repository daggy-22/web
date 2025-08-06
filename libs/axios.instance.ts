import axios from "axios";
import useUserStore from "@/stores/userStore";
import { apiBaseUrl } from "@/utils/helper";
import usePreviousPathStore from "@/stores/previousPathStore";
import toast from "react-hot-toast";

const publicEndpoints = [
  "featured",
  "device-by-limit",
  "initiate-onboarding",
  "initiate-reset-password",
  "validate-reset-password",
  "validate-onboarding",
  "/login",
];

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = useUserStore.getState().user;
    const isPublicEndpoint = publicEndpoints.some((segment) =>
      config.url?.includes(segment)
    );

    if (!isPublicEndpoint && user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const isBrowser = typeof window !== "undefined";

    const isPublicApi = publicEndpoints.some((segment) =>
      originalRequest?.url?.includes(segment)
    );

    if (!isPublicApi && isBrowser) {
      const currentPath = window.location.pathname;
      const isHomePage = currentPath === "/";

      useUserStore.getState().clearUser();

      if (!isHomePage) {
        const intendedPath = currentPath + window.location.search;
        usePreviousPathStore.getState().setPath(intendedPath);
        toast.error("You have to login");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
