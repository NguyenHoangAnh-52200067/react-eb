import { Table, Button, Space, Typography } from "antd";
import useSWR from "swr";
import BoxHead from "../components/BoxHead";
import useAxiosFetcher from "../configuration/useAxiosFetcher";
import Delete from "../components/Delete";
import { Link } from "react-router-dom";

const AdminProduct = () => {
  const fetcher = useAxiosFetcher(false);
  const { data, isLoading, error, mutate } = useSWR("/product/all", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
      filters: [...new Set(data.map((item) => item.category.name))].map(
        (name) => ({ text: name, value: name })
      ),
      onFilter: (value, record) => record.category.name === value,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => (
        <Typography.Text type="danger">
          {price.toLocaleString()}$
        </Typography.Text>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/update-product/${record.id}`}>
            <Button type="primary" size="small">
              Edit
            </Button>
          </Link>
          <Delete
            task={`Product ${record.id}`}
            endpoint={`product/${record.id}`}
            mutate={mutate}
          />
        </Space>
      ),
    },
  ];

  return (
    <section>
      <BoxHead title="PRODUCTS" />
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", marginBlock: "50px" }}
      >
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 8 }}
        />
      </div>
    </section>
  );
};

export default AdminProduct;
