import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

//const baseURL = " https://pentagonoapi.ucuenca.edu.ec";

const baseURL = "http://127.0.0.1:8088/";

import INTERNAL_ROUTES from "../data/constants/internalRoutes";
import { getUserFromLocalStorage } from "./persistUser.service";


const axiosInstanceFiles = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",

  },
});

axiosInstanceFiles.interceptors.request.use(function (
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

axiosInstanceFiles.interceptors.response.use(
  (response): AxiosResponse<any, any> => response,
  (error) => {
    // TODO: Validate all errors types
    switch (error.response.status) {
      case 401:
        window.location.href = `${INTERNAL_ROUTES.SERVER_ERROR_401}`; // Unauthorized
        break;
      case 503:
        window.location.href = `${INTERNAL_ROUTES.AUTH_LOGIN}`; // Service unavailable
        break;
      case 404:
        window.location.href = `${INTERNAL_ROUTES.AUTH_LOGIN}`;
        break;
        case 500:
          //window.location.href = `${INTERNAL_ROUTES.AUTH_LOGIN}`; // Server error
          break;
      default:
        break;
    }
    let errorMessage = "";
    if (error.response && error.response.data?.errors) {
      errorMessage = error.response.data.errors[0].message;
    } else if (error.response && error.response.data) {
      errorMessage = error.response.data.msg;
    } else {
      errorMessage = "Server error";
    }
    return Promise.reject(errorMessage);
  }
);



export default axiosInstanceFiles;
