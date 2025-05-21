import BoxHead from "../components/BoxHead";
import { Button, Descriptions, Divider, Flex, Space, Typography } from "antd";
import ChangeUserInfo from "../components/ChangeUserInfo";
import useSubmit from "../configuration/useSubmit";
import useSWR from "swr";
import useAxiosFetcher from "../configuration/useAxiosFetcher";
import { useCartStore } from "../store/CartStore";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
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

  const { data: info, isLoading, error, mutate } = useSWR("auth/info", fetcher);

  const { cartItems: cart } = useCartStore();

  const navigate = useNavigate();

  if (cart.length === 0) {
    navigate(-1);
  }

  const { submit: submitFunc } = useSubmit("post");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  async function handleConfirm() {
    const body = {
      total: cart.total,
      items: cart.cartChildren.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };
    try {
      const res = await submitFunc(body, "/order");

      if (res) {
        navigate("/orders");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <BoxHead title="Checkout Your Order" align="center" />

      <div style={styles.container}>
        <ChangeUserInfo info={info} mutate={mutate} />
        <Descriptions
          style={{
            marginBlock: "30px",
          }}
          title="Your Info"
          items={[
            {
              key: "1",
              label: "Email",
              children: info.email,
            },
            {
              key: "2",
              label: "Full Name",
              children: info.fullName ?? "empty",
            },
            {
              key: "3",
              label: "Phone Number",
              children: info.phoneNumber ?? "empty",
            },
            {
              key: "4",
              label: "Address",
              children: info.address ?? "empty",
            },
            {
              key: "5",
              label: "Gender",
              children: info.gender.toUpperCase() ?? "empty",
            },
          ]}
        />

        <Space
          direction="vertical"
          style={{
            width: "100%",
            marginTop: "20px",
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
                    {item.product.price}$
                  </Typography.Text>

                  <Typography.Text type="secondary">
                    Quantity : x{item.quantity}
                  </Typography.Text>
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

          <Button onClick={handleConfirm} type="primary" size="large" block>
            Confirm
          </Button>
        </Space>
      </div>
    </section>
  );
};

export default Checkout;
