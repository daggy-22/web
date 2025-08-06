import axios from "axios";
import useTokenStore from "@/stores/tokenStore";
import { apiBaseUrl } from "@/utils/helper";

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useTokenStore.getState().token;
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
    if (error.response?.status === 401) {
      // const router = useRouter();
      // useTokenStore.getState().clearToken(); 
      // useTokenStore.getState().clearPhone(); 
      // router.push("/login"); 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
