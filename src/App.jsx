import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserInformation from "./pages/UserInformation";
import ProductDetail from "./pages/ProductDetail";
import UserCart from "./pages/UserCart";
import Checkout from "./pages/Checkout";
import HistoryOrder from "./pages/HistoryOrder";
import AdminLayout from "./components/AdminLayout";
import CreateProduct from "./pages/CreateProduct";
import Category from "./pages/Category";
import AdminProduct from "./pages/AdminProduct";
import OrderResult from "./pages/OrderResult";
import UpdateProduct from "./pages/UpdateProduct";
import AdminOrders from "./pages/AdminOrders";
import Products from "./pages/Products";
import { Result } from "antd";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout shouldAuthenticate={false} />}>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="/products" element={<Products />} />
        </Route>

        <Route path="/" element={<MainLayout shouldAuthenticate={true} />}>
          <Route path="/info" element={<UserInformation />} />
          <Route path="/cart" element={<UserCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<HistoryOrder />} />
          <Route path="/order-result" element={<OrderResult />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="category" element={<Category />} />
          <Route path="products" element={<AdminProduct />} />
          <Route element={<AdminProduct />} index />
          <Route element={<AdminOrders />} path="orders" />
          <Route path="update-product/:id" element={<UpdateProduct />} />
        </Route>

        <Route
          path="*"
          element={
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
