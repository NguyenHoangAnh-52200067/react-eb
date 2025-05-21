import BoxHead from "./BoxHead";
import { Col, Row } from "antd";
import ProductCard from "./ProductCard";
import useSWR from "swr";
import useAxiosFetcher from "../configuration/useAxiosFetcher";

const TopProducts = () => {
  const fetcher = useAxiosFetcher(false);
  const {
    data: products,
    isLoading,
    error,
  } = useSWR("/product/random?quantity=4", fetcher);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <section style={{ paddingBlock: "10px" }}>
      <BoxHead title="Top Products For You" align="start" />
      <Row
        gutter={[20, 20]}
        style={{
          marginBlock: "40px",
        }}
      >
        {products.map((product) => (
          <Col xs={24} sm={12} lg={6} key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default TopProducts;
