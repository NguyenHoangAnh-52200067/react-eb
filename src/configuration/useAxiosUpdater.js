import useAuthSore from "../store/AuthStore";
import useBasicAuth from "./useBasicAuth";

const useAxiosUpdater = (method) => {
  const email = useAuthSore((state) => state.email);
  const password = useAuthSore((state) => state.password);
  const axios = useBasicAuth(email, password);

  const fetcher = async (url, { arg: data }) => {
    const response = await axios[method](url, data);
    return response.data;
  };

  return fetcher;
};

export default useAxiosUpdater;
