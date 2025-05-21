import {
  FileDoneOutlined,
  LogoutOutlined,
  SearchOutlined,
  SettingFilled,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Input,
  Layout,
  Menu,
  Typography,
} from "antd";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import useAuthSore from "../store/AuthStore";
import useLogout from "../configuration/useLogout";
import { toast } from "react-toastify";
import useAxiosFetcher from "../configuration/useAxiosFetcher";
import useSWR from "swr";
const { Header } = Layout;

const Navbar = () => {
  const onSuccess = () => {};
  const logout = useLogout(onSuccess);

  const dropdownItems = [
    {
      key: "1",
      label: <Link to="/info">Profile</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: <Link to="/orders">Orders</Link>,
      icon: <FileDoneOutlined />,
    },
    {
      key: "3",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: () => {
        logout();
      },
    },
  ];

  const avatar = useAuthSore((state) => state.avatar);

  const isDesltop = useMediaQuery({ query: "(min-width: 991.98px)" });

  const navigate = useNavigate();

  const role = useAuthSore((state) => state.role);
  const isLogin = useAuthSore((state) => state.isLogin);

  const isAdmin = isLogin && role.find((r) => r.name == "ROLE_ADMIN");

  const handleOnSearch = (value) => {
    if (value.length < 2) {
      toast.warning("Please enter the product name to search");
      return;
    }
    navigate(`/products?productName=${value}`);
  };
  const fetcher = useAxiosFetcher(false);

  const {
    data: category,
    isLoading,
    error,
  } = useSWR("/category/get-names", fetcher);

  if (isLoading)
    return (
      <>
        <div>Loading...</div>
      </>
    );

  if (error) return <p>Error...</p>;

  const items = [
    {
      key: "1",
      label: <Link to="/">Home</Link>,
    },
    {
      key: "2",
      label: <Link to={"/products"}>All Products</Link>,
    },
    {
      key: "4",
      label: "Categories",
      children: category.map((c) => ({
        key: Math.random() * c.id,
        label: c.name,
        onClick: () => {
          navigate(`/products?categoryId=${c.id.toString()}`);
        },
      })),
    },
  ];

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#08eaff",
        borderRadius: "5px",
        gap: "24px",
        borderBottom: "1px solid #f0f0f0",
        paddingBlock: "35px",
      }}
    >
      <Link to={"/"}>
        <Typography.Title
          level={5}
          style={{
            letterSpacing: "0.07em",
            color: "#1e1732",
            fontWeight: "600",
            margin: "0",
            cursor: "pointer",
          }}
          ellipsis
        >
          Spring Commerce
        </Typography.Title>
      </Link>
      <Menu
        mode="horizontal"
        style={{
          width: "350px",
          backgroundColor: "#08eaff",
          display: isDesltop ? "block" : "none",
        }}
        items={items}
      />

      <Flex gap={35} align="center">
        <Dropdown
          arrow
          placement="bottomCenter"
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <Input.Search
                    enterButton
                    placeholder="Search for products..."
                    size="middle"
                    onSearch={handleOnSearch}
                  />
                ),
              },
            ],
            onClick: (e) => e.preventDefault(),

            // interactive: true,
          }}
        >
          <SearchOutlined />
        </Dropdown>

        {!isLogin ? (
          <Link to={"/login"}>
            <Button type="primary">Login</Button>
          </Link>
        ) : (
          <>
            {!isAdmin ? (
              <Flex align="center" gap={25}>
                <ShoppingCartOutlined
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    color: "blue",
                  }}
                  onClick={() => navigate("/cart")}
                />
                <Dropdown
                  arrow
                  menu={{
                    items: dropdownItems,
                    selectable: true,
                  }}
                >
                  <div onClick={(e) => e.preventDefault()}>
                    <Avatar
                      style={{
                        verticalAlign: "middle",
                      }}
                      size="large"
                      src={<img src={avatar} alt="avatar" />}
                    />
                  </div>
                </Dropdown>{" "}
              </Flex>
            ) : (
              <Dropdown
                arrow
                menu={{
                  items: [
                    {
                      key: "1",
                      label: <Link to="/admin">Admin</Link>,
                      extra: <SettingFilled />,
                    },
                    {
                      key: "2",
                      label: "Logout",
                      extra: <LogoutOutlined />,
                      onClick: () => {
                        logout();
                      },
                    },
                  ],
                  selectable: true,
                }}
              >
                <Button>Admin</Button>
              </Dropdown>
            )}
          </>
        )}
      </Flex>
    </Header>
  );
};

export default Navbar;
