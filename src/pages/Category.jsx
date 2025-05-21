import useAxiosFetcher from "../configuration/useAxiosFetcher";
import useSWR from "swr";
import BoxHead from "../components/BoxHead";
import { Flex, Space, Table } from "antd";
import AddCategory from "../components/AddCategory";
import EditCategory from "../components/EditCategory";
import Delete from "../components/Delete";

const Category = () => {
  const fetcher = useAxiosFetcher(false);

  const { isLoading, data, mutate } = useSWR("/category/get-names", fetcher);

  if (isLoading) return <div>Loading...</div>;

  const colums = [
    { title: "Category ID", dataIndex: "id", key: "id" },
    { title: "Category Name", dataIndex: "name", key: "name" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" key={record.id}>
          <EditCategory category={record} mutate={mutate} />
          <Delete
            endpoint={"/category/" + record.id}
            task={record.name}
            mutate={mutate}
          />
        </Space>
      ),
    },
  ];

  return (
    <section>
      <BoxHead title="Category" />
      <div
        style={{
          padding: "24px",
          maxWidth: "1200px",
          marginInline: "auto",
          width: "100%",
        }}
      >
        <Flex
          justify="start"
          style={{
            marginBottom: "20px",
          }}
        >
          <AddCategory mutate={mutate} />
        </Flex>

        <Table
          pagination={{ pageSize: 8 }}
          dataSource={data}
          columns={colums}
        />
      </div>
    </section>
  );
};

export default Category;
