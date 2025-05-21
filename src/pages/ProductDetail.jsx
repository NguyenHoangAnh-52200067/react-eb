import {
  Breadcrumb,
  Col,
  Collapse,
  Divider,
  Flex,
  Row,
  Space,
  Typography,
} from "antd";
import { Link, useParams } from "react-router-dom";
import AddToCart from "../components/AddToCart";
import useSWR from "swr";
import useAxiosFetcher from "../configuration/useAxiosFetcher";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const ProductDetail = () => {
  const { id } = useParams();

  const fetcher = useAxiosFetcher(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { data: product, isLoading, error } = useSWR(`/product/${id}`, fetcher);
  const isDesktop = useMediaQuery({ query: "(min-width: 480px)" });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const contentStyle = {
    margin: 0,
    ascpectRatio: "1/1",
    width: "100%",
    objectFit: "cover",
    borderRadius: "8px",
    maxHeight: "650px",
    minHeight: isDesktop ? "650px" : "380px",
    background: "#364d79",
  };

  return (
    <section
      style={{
        minHeight: "100vh",
      }}
    >
      <Breadcrumb
        separator=">"
        items={[
          {
            title: (
              <Link to={"/products"}>
                <Typography.Text
                  style={{
                    color: "#1890ff",
                  }}
                >
                  Home
                </Typography.Text>
              </Link>
            ),
          },
          {
            title: product.category.name,
          },
          {
            title: product.brand,
          },
        ]}
      />
      <Row
        style={{
          marginBlock: "25px",
        }}
        gutter={[16, 16]}
      >
        <Col xs={24} lg={12}>
          <Swiper
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            spaceBetween={10}
            modules={[Thumbs, Autoplay]}
            thumbs={{ swiper: thumbsSwiper }}
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image.url} style={contentStyle} alt={product.name} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView={product.images.length + 1}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            className="mySwiper"
            style={{ marginTop: "20px" }}
          >
            {product.images.map((src, index) => (
              <SwiperSlide
                key={index}
                style={{
                  border: "1px solid #08EAFF",
                  height: "170px",
                  overflow: "hidden",
                  cursor: "pointer",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={src.url}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  alt={`Thumbnail ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
        <Col xs={24} lg={12}>
          <Flex
            wrap
            vertical
            gap={20}
            style={{
              width: "100%",
            }}
          >
            <Typography.Title
              style={{
                display: "block",
              }}
              level={3}
            >
              {product.name}
            </Typography.Title>
            <Space
              style={{
                display: "flex",
              }}
            >
              <Typography.Text
                style={{
                  fontSize: "16px",
                  color: "#004469",
                  fontWeight: "500",
                }}
              >
                Brand : {product.brand}
              </Typography.Text>
              <Divider />
              <Typography.Text
                style={{
                  fontSize: "16px",
                  color: "#004469",
                  fontWeight: "500",
                }}
              >
                Category : {product.category.name}
              </Typography.Text>
            </Space>
            <Space>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: product.color,
                    borderRadius: "3px",
                  }}
                />
              </div>
              <Divider type="vertical" />
              <Typography.Text
                strong
                style={{
                  fontSize: "17px",
                  color: "#191507",
                }}
              >
                {product.color}
              </Typography.Text>
            </Space>
            <Typography.Text
              type="success"
              style={{
                fontSize: "17px",
              }}
            >
              {" "}
              {product.stock} available
            </Typography.Text>
            <Typography.Title
              type="danger"
              style={{
                lineHeight: "0",
              }}
            >
              ${product.price}
            </Typography.Title>
            <AddToCart productId={product.id} max={product.stock} />
            <Collapse
              style={{}}
              size="small"
              items={[
                {
                  key: "1",
                  label: "Description",
                  children: <p>{product.description}</p>,
                },
              ]}
            />
          </Flex>
        </Col>
      </Row>
    </section>
  );
};

export default ProductDetail;
