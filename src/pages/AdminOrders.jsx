import { Table, Avatar, Space, Typography, Tag } from "antd";
import useSWR from "swr";
import useAxiosFetcher from "../configuration/useAxiosFetcher";
import BoxHead from "../components/BoxHead";
import Delete from "../components/Delete";
import ViewOrderDetails from "../components/ViewOrderDetails";
const AdminOrders = () => {
  const fetcher = useAxiosFetcher(true);

  const {
    data: orders,
    isLoading: loading,
    error,
    mutate,
  } = useSWR("/order/all", fetcher);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <p>There was an error</p>;
  }

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer",
      key: "user",
      render: (_, record) => (
        <Space>
          <Avatar src={record.user.avatar} />
          <Space direction="vertical">
            <Typography.Text
              style={{
                fontWeight: "bold",
              }}
            >
              {record.user.fullName}
            </Typography.Text>
            <Typography.Text ellipsis>{record.user.email}</Typography.Text>
            <Typography.Text ellipsis>
              {record.user.phoneNumber}
            </Typography.Text>
          </Space>
        </Space>
      ),
    },

    {
      title: "Address",
      dataIndex: ["user", "address"],
      key: "address",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) => (
        <Typography.Text type="secondary">
          {new Date(date).toDateString()}
        </Typography.Text>
      ),
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => (
        <Typography.Text strong type="danger">
          ${total}
        </Typography.Text>
      ),
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color="cyan">{status.toUpperCase()}</Tag>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <ViewOrderDetails mutate={mutate} order={record} />
          <Delete
            task={`order ${record.id}`}
            endpoint={`/order/${record.id}`}
            mutate={mutate}
          />
        </Space>
      ),
    },
  ];

  return (
    <section
      style={{
        maxWidth: "1200px",
        paddingBlock: "12px",
        margin: "0 auto",
      }}
    >
      <BoxHead title="Orders" />
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </section>
  );
};

export default AdminOrders;
