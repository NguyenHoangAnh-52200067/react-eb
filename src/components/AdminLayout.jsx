import { Layout, Menu, theme } from "antd";
import Navbar from "./Navbar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  AppstoreAddOutlined,
  FileZipOutlined,
  ReconciliationOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import useAuthSore from "../store/AuthStore";
const { Content, Sider } = Layout;

const AdminLayout = () => {
  const role = useAuthSore((state) => state.role);
  const isLogin = useAuthSore((state) => state.isLogin);
  const isAdmin =
    isLogin && role.find((r) => r.name == "ROLE_ADMIN") ? true : false;

  const navigate = useNavigate();

  if (!isAdmin) {
    navigate("/login");
  }

  const menuItems = [
    {
      key: "1",
      label: <Link to="/admin/products">Products</Link>,
      icon: <SettingOutlined />,
    },
    {
      key: "2",
      label: <Link to="/admin/orders">User Orders</Link>,
      icon: <ReconciliationOutlined />,
    },
    {
      key: "3",
      label: <Link to="/admin/create-product">Create Product</Link>,
      icon: <AppstoreAddOutlined />,
    },
    {
      key: "4",
      label: <Link to="/admin/category">Category</Link>,
      icon: <FileZipOutlined />,
    },
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Navbar />
      <Layout>
        <Sider
          width={200}
          collapsed
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={menuItems}
          />
        </Sider>
        <Layout
          style={{
            padding: "0",
          }}
        >
          <Content
            style={{
              padding: "48px",
              backgroundColor: "#fff",
              minHeight: "calc(100vh - 100px)",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
