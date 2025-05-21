import {
  AntDesignOutlined,
  BgColorsOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select, Space } from "antd";
import useSWR from "swr";
import useAxiosFetcher from "../configuration/useAxiosFetcher";
import { useMediaQuery } from "react-responsive";

const FilterForm = ({
  initialValues,
  handleFinish,
  setSearchParams,
  setOpen,
}) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1232.98px)" });

  const [form] = Form.useForm();

  const priceOptions = [
    {
      id: 1,
      name: "Below 100$",
      value: [0, 100],
    },
    {
      id: 2,
      name: "100$-500$",
      value: [100, 500],
    },
    {
      id: 3,
      name: "500$-1000$",
      value: [500, 1000],
    },
    {
      id: 4,
      name: "Above 1000$",
      value: [1000, 999999],
    },
  ];
  const fetcher = useAxiosFetcher(false);

  const {
    data: category,
    isLoading,
    error,
  } = useSWR("/category/get-names", fetcher);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error...</div>;

  return (
    <Form
      form={form}
      initialValues={initialValues}
      name="products"
      onFinish={handleFinish}
      layout={isDesktop ? "inline" : "vertical"}
    >
      <Form.Item name="categoryId" rules={[{ required: false }]}>
        <Select style={{ width: isDesktop ? "210px" : "100%" }}>
          {category?.map((item) => (
            <Select.Option key={item.name} value={item.id.toString()}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name={"priceRange"} rules={[{ required: false }]}>
        <Select style={{ width: isDesktop ? "210px" : "100%" }}>
          {priceOptions.map((item) => (
            <Select.Option
              key={item.id}
              value={`${item.value[0]}-${item.value[1]}`}
            >
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="productName" rules={[{ required: false }]}>
        <Input
          addonBefore={<ProductOutlined />}
          placeholder="Filter by product name"
        />
      </Form.Item>
      <Form.Item name="brandName" rules={[{ required: false }]}>
        <Input
          addonBefore={<AntDesignOutlined />}
          placeholder="Filter by brand name"
        />
      </Form.Item>
      <Form.Item name="colorName" rules={[{ required: false }]}>
        <Input
          addonBefore={<BgColorsOutlined />}
          placeholder="Filter by color name"
        />
      </Form.Item>

      <Space>
        <Form.Item>
          <Button
            htmlType="button"
            onClick={() => {
              setSearchParams("");
              form.setFieldsValue({
                categoryId: "",
                priceRange: "",
                productName: "",
                brandName: "",
                colorName: "",
              });
              if (!isDesktop) setOpen(false);
            }}
          >
            Clear
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default FilterForm;
