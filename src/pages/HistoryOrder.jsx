import BoxHead from "../components/BoxHead";
import {
  Descriptions,
  Divider,
  Empty,
  Flex,
  Space,
  Tag,
  Typography,
} from "antd";
import useAxiosFetcher from "../configuration/useAxiosFetcher";
import useSWR from "swr";
const HistoryOrder = () => {
  const fetcher = useAxiosFetcher(true);

  const { data: info, isLoading, error } = useSWR("auth/info", fetcher);

  const {
    data: orders,
    isLoading: isLoadingOrders,
    error: errorOrders,
  } = useSWR("/order", fetcher);

  if (isLoading || isLoadingOrders) return <div>Loading...</div>;
  if (error || errorOrders) return <div>Error</div>;

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

  if (orders.length === 0)
    return (
      <Empty description={<span>You have not ordered any product yet</span>} />
    );

  return (
    <section>
      <BoxHead title="History Order " align="center" />

      <div style={styles.container}>
        {orders.map((order) => (
          <div key={order.id}>
            <Space
              direction="vertical"
              style={{ width: "100%", marginTop: "20px" }}
              size="middle"
            >
              <Flex justify="space-between" align="center">
                <Typography.Text strong type="success">
                  Order ID : {order.id}
                </Typography.Text>
                <Typography.Text type="secondary">
                  Date : {new Date(order.orderDate).toLocaleDateString()}
                </Typography.Text>
              </Flex>
              <Descriptions
                style={{
                  marginBlock: "30px",
                }}
                items={[
                  {
                    key: "2",
                    label: "Telephone",
                    children: info.phoneNumber,
                  },

                  {
                    key: "4",
                    label: "Full Name",
                    children: info.fullName,
                  },
                  {
                    key: "5",
                    label: "Address",
                    children: info.address,
                  },
                ]}
              />

              <Typography.Text strong>
                Status : <Tag color="volcano">{order.status}</Tag>
              </Typography.Text>

              {order.items.map((item) => (
                <div key={item.id}>
                  <Space
                    direction="vertical"
                    style={{
                      width: "100%",
                      marginTop: "20px",
                    }}
                  >
                    <Flex
                      wrap
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
                          <Typography.Text
                            ellipsis={{
                              rows: 2,
                              expandable: true,
                              symbol: "more",
                            }}
                            style={{ textWrap: "wrap" }}
                            strong
                          >
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
                          Quantity x {item.quantity}
                        </Typography.Text>
                      </Space>
                    </Flex>

                    <Divider />
                  </Space>
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
                  {order.total}$
                </Typography.Text>
              </Flex>
              <Divider />
            </Space>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistoryOrder;
