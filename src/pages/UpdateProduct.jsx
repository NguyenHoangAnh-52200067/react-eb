import { useParams } from "react-router-dom";
import useAxiosFetcher from "../configuration/useAxiosFetcher";
import useSWR from "swr";
import ProductEntry from "../components/ProductEntry";

const UpdateProduct = () => {
  const { id } = useParams();

  const fetcher = useAxiosFetcher(false);

  const { data, isLoading, error } = useSWR(`/product/${id}`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return <ProductEntry productData={data} productId={id} />;
};

export default UpdateProduct;
