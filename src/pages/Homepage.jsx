import BoxHead from "../components/BoxHead";
import { Button, Col, Flex, Row, Space, Typography } from "antd";
import { Typewriter } from "react-simple-typewriter";
import controller from "../assets/json/controllerAnimation.json";
import Lottie from "lottie-react";
import TopProducts from "../components/TopProducts";
const Homepage = () => {
  const styles = {
    section: {
      paddingBlock: "50px",
    },
  };

  return (
    <>
      <section style={styles.section}>
        <BoxHead title="My Spring ECommerce" desc="Welcome to our store!" />
        <Row gutter={[5]} style={{ marginBlock: "50px" }}>
          <Col
            xs={24}
            sm={12}
            style={{
              padding: "auto 20px",
            }}
          >
            <h1
              style={{
                fontWeight: "normal",
                fontSize: "2rem",
              }}
            >
              Find the best gaming gears
              <span
                style={{ color: "red", fontWeight: "bold", marginLeft: "10px" }}
              >
                <Typewriter
                  words={["Here", "Now", "Easily"]}
                  loop
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h1>
            <div
              style={{
                marginBlock: "20px",
              }}
            >
              <Typography.Text style={{ fontSize: "18px" }}>
                We provide the best products for you to choose from. Shop now
                and get the best deals!
              </Typography.Text>
            </div>
            <div
              direction="vertical"
              style={{ width: "80%", marginBlock: "15px" }}
            ></div>
            <Space>
              <Button type="primary">Shop Now</Button>
              <Button>Learn More</Button>
            </Space>
          </Col>
          <Col xs={24} sm={12}>
            <Flex justify="center" align="center">
              <Lottie
                style={{
                  width: "70%",
                  height: "auto",
                }}
                animationData={controller}
              />
            </Flex>
          </Col>
        </Row>
      </section>
      <TopProducts />
    </>
  );
};

export default Homepage;
