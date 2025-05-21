import { Button, Col, Empty, Modal, Row } from "antd";
import BoxHead from "../components/BoxHead";
import useSWR from "swr";
import useAxiosFetcher from "../configuration/useAxiosFetcher";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useMediaQuery } from "react-responsive";
import FilterForm from "../components/FilterForm";
import { FilterOutlined } from "@ant-design/icons";
import { useState } from "react";

const Products = () => {
  const fetcher = useAxiosFetcher(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const isDesktop = useMediaQuery({ query: "(min-width: 1232.98px)" });
  const [open, setOpen] = useState(false);

  const {
    data: products,
    isLoading: isProductLoading,
    error: isProductError,
  } = useSWR(`product/filter?${searchParams}`, fetcher);

  if (isProductLoading) return <div>Loading...</div>;
  if (isProductError) return <div>Error...</div>;

  // const baseSearchParams = new URLSearchParams();

  const handleFinish = (values) => {
    console.log(values);

    const newParams = new URLSearchParams();
    for (const key in values) {
      if (key === "priceRange" && values[key]) {
        const [min, max] = values[key].split("-");
        newParams.append("minPrice", min);
        newParams.append("maxPrice", max);
        continue;
      }

      if (values[key]) {
        newParams.append(key, values[key]);
      }
    }
    setSearchParams(newParams);
    setOpen(false);
  };

  const defaultParams = Object.fromEntries(searchParams.entries());

  const initialValues = { ...defaultParams };
  if (defaultParams.minPrice && defaultParams.maxPrice) {
    initialValues.priceRange = `${defaultParams.minPrice}-${defaultParams.maxPrice}`;
  }

  return (
    <section>
      <BoxHead title="Product ElasticBeastalk" />

      <div
        style={{
          display: isDesktop ? "flex" : "none",
          justifyContent: "flex-end",
        }}
      >
        <FilterForm
          initialValues={initialValues}
          handleFinish={handleFinish}
          setSearchParams={setSearchParams}
        />
      </div>

      <Button
        onClick={() => setOpen(true)}
        icon={<FilterOutlined />}
        style={{
          display: isDesktop ? "none" : "block",
        }}
        type="primary"
      >
        Filter
      </Button>

      <Modal
        style={{
          display: isDesktop ? "none" : "inline-block",
        }}
        centered
        onCancel={() => setOpen(false)}
        title="Filter"
        open={open}
        footer={null}
        onClose={() => setOpen(false)}
      >
        <FilterForm
          setOpen={setOpen}
          initialValues={initialValues}
          handleFinish={handleFinish}
          setSearchParams={setSearchParams}
        />
      </Modal>

      {products.length === 0 && (
        <Empty description="No products found" style={{ marginTop: "50px" }} />
      )}

      <Row
        style={{
          marginBlock: "55px",
        }}
        gutter={[20, 20]}
      >
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} lg={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default Products;
