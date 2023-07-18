import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseURL = "http://localhost:8088/";

import INTERNAL_ROUTES from "../data/constants/internalRoutes";
import { getUserFromLocalStorage } from "./persistUser.service";


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
  //console.log(userInfo?.token);
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
    //console.log(error);
    switch (error.response.status) {
      case 401:
        //window.location.href = `${INTERNAL_ROUTES.SERVER_ERROR_401}`; // Unauthorized
        break;
      case 503:
        window.location.href = `${INTERNAL_ROUTES.SERVER_ERROR_404}`; // Service unavailable
        break;
      case 404:
        //window.location.href = `${INTERNAL_ROUTES.SERVER_ERROR_404}`;
        console.log(window.location.href);
        //console.log("adasdas"); // Service unavailable
        break;
      /* case 500:
        window.location.href = `/#${INTERNAL_ROUTES.SERVER_ERROR_500}`; // Server error
        break;*/
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

export default axiosInstance;
