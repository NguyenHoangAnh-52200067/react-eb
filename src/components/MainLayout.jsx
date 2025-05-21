import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Layout, notification } from "antd";
import useAuthSore from "../store/AuthStore";
import AppFooter from "./AppFooter";
const { Content } = Layout;

const MainLayout = ({ shouldAuthenticate }) => {
  const isLogin = useAuthSore((state) => state.isLogin);

  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  if (shouldAuthenticate && !isLogin) {
    navigate("/login");
  }

  return (
    <Layout>
      {contextHolder}
      <Navbar />
      <Content
        style={{
          padding: "48px",
          backgroundColor: "#fff",
          minHeight: "calc(100vh - 100px)",
        }}
      >
        <Outlet />
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default MainLayout;
