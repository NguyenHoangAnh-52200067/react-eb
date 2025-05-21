import { Layout, Row, Col, Typography, Space } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const AppFooter = () => {
  return (
    <Footer style={styles.footer}>
      <Row gutter={[16, 16]} justify="space-between">
        {/* Company Information */}
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={styles.title}>
            Spring Commerce
          </Title>
          <Space direction="vertical">
            <Text>
              <HomeOutlined style={styles.icon} />
              19 Nguyen Huu Tho, District 7, Ho Chi Minh City
            </Text>
            <Text>
              <MailOutlined style={styles.icon} />
              spring@example.com.vn
            </Text>
            <Text>
              <PhoneOutlined style={styles.icon} />
              +1 (234) 567-890
            </Text>
          </Space>
        </Col>

        {/* Social Links */}
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={styles.title}>
            Follow Us
          </Title>
          <Space size="middle">
            <Link href="https://facebook.com" target="_blank">
              <FacebookOutlined style={styles.socialIcon} />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <TwitterOutlined style={styles.socialIcon} />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <InstagramOutlined style={styles.socialIcon} />
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <LinkedinOutlined style={styles.socialIcon} />
            </Link>
          </Space>
        </Col>
      </Row>

      {/* Divider */}
      <div style={styles.divider}></div>

      {/* Copyright */}
      <Row justify="center">
        <Col>
          <Text>
            &copy; {new Date().getFullYear()} Spring Commerce. All rights
            reserved.
          </Text>
        </Col>
      </Row>
    </Footer>
  );
};

const styles = {
  footer: {
    padding: "40px 50px",
  },
  title: {},
  icon: {
    marginRight: "8px",
  },
  socialIcon: {
    fontSize: "20px",

    transition: "color 0.3s",
  },
  divider: {
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    margin: "20px 0",
  },
};

// Export the Footer component
export default AppFooter;
