import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseURL = "https://pentagonoapi.ucuenca.edu.ec";

//const baseURL = "http://127.0.0.1:8088/";
import INTERNAL_ROUTES from "../data/constants/internalRoutes";
import { getUserFromLocalStorage } from "./persistUser.service";
import { userInfo } from "os";


const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",

  },
});

axiosInstance.interceptors.request.use(function (
  request
): AxiosRequestConfig<any> {
  if (request.url?.includes("assets") || request.headers?.Authorization)
    return request;
  const userInfo = getUserFromLocalStorage();
  request.headers = {
    ...request.headers,
    Authorization: `${userInfo?.token}`,
  };

  return request;
});

axiosInstance.interceptors.response.use(
  (response): AxiosResponse<any, any> => response,
  (error) => {
    // TODO: Validate all errors types
    switch (error.response.status) {
      case 401:
        //window.location.href = `${INTERNAL_ROUTES.AUTH_LOGIN}`; // Unauthorized
        break;
      /* case 404:
        window.location.href = `${INTERNAL_ROUTES.SERVER_ERROR_404}`;
        break;
      default:
        window.location.href = `${INTERNAL_ROUTES.SERVER_ERROR_404}`;
        break; */
    }
    return Promise.reject(error);
  }
);



export default axiosInstance;
