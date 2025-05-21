import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  notification,
  Select,
  Typography,
} from "antd";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import axios from "../configuration/axios";
const { Option } = Select;
const Register = () => {
  const isMobile = useMediaQuery({ query: "(min-width: 991.98px)" });
  const styles = {
    section: {
      paddingBlock: "50px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      width: isMobile ? "600px" : "100%",
    },
  };

  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);

    try {
      const response = await axios.post("/auth/register", values);
      if (response) {
        api["success"]({
          message: "Register Success",
          description: "Login to your account",
        });

        navigate("/login");
      }
    } catch (error) {
      api["error"]({
        message: error.response.data.message,
        description: "Invalid email or password",
      });
      console.error(error);
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        defaultValue={"84"}
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

  return (
    <section style={styles.section}>
      {contextHolder}
      <Card style={styles.card}>
        <div style={{ marginBlock: "15px", textAlign: "center" }}>
          <Typography.Title level={2}>Sign Up</Typography.Title>
          <Typography.Text type="secondary">
            Create an account to start shopping.
          </Typography.Text>
        </div>
        <Form
          onFinish={onFinish}
          name="loginForm"
          style={{ marginTop: "35px" }}
          layout="vertical"
          requiredMark="optional"
          scrollToFirstError
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please input your Full Name!",
              },
            ]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            hasFeedback
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select placeholder="Select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input.TextArea rows={2} placeholder="Address" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Register
            </Button>
          </Form.Item>
          <div
            style={{
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            <Typography.Text>
              Already have an account?{" "}
              <Link to={"/login"}>
                <Typography.Link>Login</Typography.Link>
              </Link>
            </Typography.Text>
          </div>
        </Form>
      </Card>
    </section>
  );
};

export default Register;
