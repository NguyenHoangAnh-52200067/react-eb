import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, notification, Typography } from "antd";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import axios from "../configuration/axios";
import useAuthSore from "../store/AuthStore";
import { toast } from "react-toastify";
const Login = () => {
  const isMobile = useMediaQuery({ query: "(min-width: 991.98px)" });
  const navigate = useNavigate();

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
  const setEmail = useAuthSore((state) => state.setEmail);
  const setPassword = useAuthSore((state) => state.setPassword);
  const setIsLogin = useAuthSore((state) => state.setIsLogin);
  const setRole = useAuthSore((state) => state.setRole);
  const setAvatar = useAuthSore((state) => state.setAvatar);

  const onFinish = async (values) => {
    try {
      const response = await axios.post("/auth/login", values);
      if (response) {
        setEmail(response.data.email);
        setPassword(values.password);
        setIsLogin(true);
        setRole(response.data.roles);
        setAvatar(response.data.avatar || "/user.png");

        toast.success("Login successfully");

        navigate("/");
      }
    } catch (error) {
      toast("Login failed");
      console.error(error);
    }
  };

  return (
    <section style={styles.section}>
      {contextHolder}
      <Card style={styles.card}>
        <div style={{ marginBlock: "15px", textAlign: "center" }}>
          <Typography.Title level={2}>Login</Typography.Title>
          <Typography.Text type="secondary">
            Welcome back! Please login to your account.
          </Typography.Text>
        </div>
        <Form
          onFinish={onFinish}
          name="loginForm"
          style={{ marginTop: "35px" }}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
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
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Login
            </Button>
          </Form.Item>
          <div>
            <Typography.Text>
              Do not have an account?{" "}
              <Link to={"/register"}>
                <Typography.Link>Register</Typography.Link>
              </Link>
            </Typography.Text>
          </div>
        </Form>
      </Card>
    </section>
  );
};

export default Login;
