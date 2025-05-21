import instance from "./axios";
import useBasicAuth from "./useBasicAuth";

const useAxiosFetcher = (isAuth) => {
  const axiosBasic = useBasicAuth();
  const axiosInstance = isAuth ? axiosBasic : instance;

  const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

  return fetcher;
};

export default useAxiosFetcher;
