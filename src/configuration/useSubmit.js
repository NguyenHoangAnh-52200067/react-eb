import { useState } from "react";
import useAuthSore from "../store/AuthStore";
import useBasicAuth from "./useBasicAuth";

////////////////////////// NEW USESUBMIT FUNCTION //////////////////////////

const useSubmit = (method) => {
  const email = useAuthSore((state) => state.email);
  const password = useAuthSore((state) => state.password);
  const axios = useBasicAuth(email, password);
  const [loading, setLoading] = useState(false);

  const submit = async (data, url) => {
    setLoading(true);
    try {
      const response = await axios[method](url, data);

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading };
};

export default useSubmit;
