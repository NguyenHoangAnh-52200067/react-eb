import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Flex, InputNumber, Modal, Space, Typography } from "antd";
import { useState } from "react";
import useAuthSore from "../store/AuthStore";
import useSWRMutation from "swr/mutation";
import useAxiosUpdater from "../configuration/useAxiosUpdater";
import { toast } from "react-toastify";

const AddToCart = ({ max, productId }) => {
  const [open, setOpen] = useState(false);
  const fetcher = useAxiosUpdater("post");

  const { trigger, isMutating } = useSWRMutation("/cart", fetcher);

  const [quantity, setQuantity] = useState(1);

  const isLogin = useAuthSore((state) => state.isLogin);
  const role = useAuthSore((state) => state.role);

  const hanleAddToCart = () => {
    if (role.find((r) => r.name === "ROLE_ADMIN")) {
      toast.error("Admin can't add to cart");
      return;
    }
    if (!isLogin) {
      toast.error("Please login first");
      return;
    }
    setOpen(true);
  };
  function handleAddToCart() {
    setOpen(false);
    try {
      const body = {
        quantity,
        productId,
      };

      trigger(body);
    } catch (error) {
      console.log(error);

      toast.error("Failed to add to cart!");
      return;
    }
    toast.success("Added to cart successfully!");
  }
  return (
    <>
      <Button
        onClick={hanleAddToCart}
        size="large"
        style={{
          width: "300px",
        }}
        type="primary"
        icon={<ShoppingCartOutlined />}
      >
        Add to Cart
      </Button>
      <Modal
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        title="Add to Cart"
      >
        <div
          style={{
            marginBottom: "16px",
          }}
        >
          <Typography.Title level={4}>Product Name</Typography.Title>
          <Typography.Text>
            Please select the quantity you want to add to cart
          </Typography.Text>
        </div>

        <Space>
          <InputNumber
            max={max}
            min={1}
            value={quantity}
            changeOnWheel
            onChange={(value) => setQuantity(value)}
            size="large"
          />
        </Space>

        <Flex justify="end" gap={10}>
          <Button
            loading={isMutating}
            onClick={handleAddToCart}
            type="primary"
            style={{
              marginTop: "16px",
            }}
          >
            Add to Cart
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default AddToCart;
