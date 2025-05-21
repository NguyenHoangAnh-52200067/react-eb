import { Avatar, Button, List, Modal, Select, Space, Typography } from "antd";
import { useState } from "react";
import useSubmit from "../configuration/useSubmit";
import { toast } from "react-toastify";

const ViewOrderDetails = ({ order, mutate }) => {
  const [open, setOpen] = useState(false);
  const { submit, loading } = useSubmit("put");

  async function handleOnChange(status) {
    try {
      const res = await submit({ status }, `/order/${order.id}/status`);
      if (res) {
        mutate();
        toast.success("Status updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Status update failed");
    }
  }

  return (
    <div>
      <Button size="small" type="primary" onClick={() => setOpen(true)}>
        View
      </Button>
      <Modal
        title="Order Details"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
        centered
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Typography.Text type="success">
            Order Date: {new Date(order.orderDate).toDateString()}
          </Typography.Text>

          <Typography.Text type="danger">Total: ${order.total}</Typography.Text>

          <List
            style={{ width: "100%" }}
            dataSource={order.items}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Typography.Text
                      style={{
                        fontSize: "1rem",
                      }}
                      strong
                    >
                      {item.product.name}
                    </Typography.Text>
                  }
                  //   avatar={item.product.images[0].url}
                  avatar={
                    <Avatar size="large" src={item.product.images[0].url} />
                  }
                  description={
                    <Space>
                      <Typography.Text
                        style={{
                          fontSize: "1.1rem",
                        }}
                        strong
                        type="danger"
                      >
                        ${item.product.price}
                      </Typography.Text>
                      <Typography.Text type="secondary">
                        x{item.quantity}
                      </Typography.Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />

          <Typography.Text>Change Status :</Typography.Text>

          <Select
            disabled={loading}
            defaultValue={order.status}
            onChange={(status) => handleOnChange(status)}
            style={{ width: 180 }}
            options={[
              { label: "Waiting", value: "waiting" },
              { label: "Processing", value: "processing" },
              { label: "Completed", value: "completed" },
              { label: "Cancelled", value: "cancelled" },
            ]}
          />
        </Space>
      </Modal>
    </div>
  );
};

export default ViewOrderDetails;
