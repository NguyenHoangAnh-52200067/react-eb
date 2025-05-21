import { useEffect } from "react";
import instance from "./axios";

const useBasicAuth = (email, password) => {
  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        if (email && password) {
          config.headers.Authorization = `Basic ${btoa(
            `${email}:${password}`
          )}`;
        }
        return config;
      },
      (error) => {
        console.error(error);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.error(error);
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [email, password]);

  return instance;
};

export default useBasicAuth;
