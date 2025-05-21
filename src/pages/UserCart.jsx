import BoxHead from "../components/BoxHead";
import {
  Button,
  Divider,
  Empty,
  Flex,
  InputNumber,
  Space,
  Typography,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import useAxiosFetcher from "../configuration/useAxiosFetcher";
import useSWR from "swr";
import useSubmit from "../configuration/useSubmit";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/CartStore";
import { toast } from "react-toastify";

const UserCart = () => {
  const navigate = useNavigate();

  const { addToCart } = useCartStore();

  const styles = {
    container: {
      margin: "0 auto",
      padding: "20px",
      maxWidth: "768px",
      border: "1px solid #ddd",
      marginBlock: "40px",
      borderRadius: "10px",
    },
  };
  const fetcher = useAxiosFetcher(true);

  const { submit: submitFunc } = useSubmit("put");
  const { submit: deleteFunc } = useSubmit("delete");

  const { data: cart, isLoading, error, mutate } = useSWR("/cart", fetcher);

  console.log(cart);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const handleQuantityChange = async (value, id) => {
    try {
      const body = {
        quantity: value,
      };
      const res = await submitFunc(body, `/cart/${id}`);

      if (res) {
        toast.success("Quantity updated successfully!");
        mutate();
      }
    } catch (error) {
      toast.error("Failed to update quantity!");
      console.log(error);
    }
  };

  if (cart.cartChildren.length === 0) {
    return (
      <Empty
        description={<span>Your cart is empty</span>}
        style={{ marginTop: "50px" }}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }
  const handleRemoveCart = async (id) => {
    try {
      const res = await deleteFunc(null, `/cart/${id}`);

      if (res) {
        toast.success("Removed from cart successfully!");
        mutate();
      }
    } catch (error) {
      toast.error("Failed to remove from cart!");
      console.log(error);
    }
  };
  function handleCheckout() {
    addToCart(cart);
    navigate("/checkout");
  }
  return (
    <section>
      <BoxHead title="Shopping Cart" align="center" />
      <div style={styles.container}>
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
        >
          {cart.cartChildren.map((item) => (
            <div key={item.id}>
              <Flex
                justify="space-between"
                gap={35}
                style={{
                  width: "100%",
                }}
              >
                <Flex gap={12}>
                  <Space direction="vertical">
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                      src={item.product.images[0].url}
                      alt="product"
                    />
                    <Button
                      onClick={() => handleRemoveCart(item.id)}
                      icon={<DeleteOutlined />}
                      type="text"
                    >
                      Remove
                    </Button>
                  </Space>
                  <Space direction="vertical">
                    <Typography.Text style={{ textWrap: "wrap" }} strong>
                      {item.product.name}
                    </Typography.Text>
                    <Typography.Text type="secondary">
                      {item.product.category.name}- {item.product.color}
                    </Typography.Text>
                  </Space>
                </Flex>
                <Space direction="vertical">
                  <Typography.Text
                    style={{
                      fontSize: "23px",
                    }}
                    type="danger"
                    strong
                  >
                    {item.subTotal}$
                  </Typography.Text>

                  <InputNumber
                    size="large"
                    min={1}
                    changeOnWheel
                    max={item.product.stock}
                    value={item?.quantity}
                    onChange={(value) => handleQuantityChange(value, item.id)}
                  />
                </Space>
              </Flex>

              <Divider />
            </div>
          ))}

          <Flex
            justify="space-between"
            align="center"
            style={{
              width: "100%",
            }}
          >
            <Typography.Title
              level={4}
              style={{
                lineHeight: "0",
              }}
            >
              {" "}
              Total
            </Typography.Title>

            <Typography.Text
              style={{
                fontSize: "35px",
              }}
              type="danger"
              strong
            >
              {cart.total}$
            </Typography.Text>
          </Flex>

          <Button
            type="default"
            danger
            size="large"
            block
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Space>
      </div>
    </section>
  );
};

export default UserCart;
