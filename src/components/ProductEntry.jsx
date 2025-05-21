import { useState } from "react";
import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getBase64 } from "../helpers";
import { useMediaQuery } from "react-responsive";
import useAxiosFetcher from "../configuration/useAxiosFetcher";
import useSWR from "swr";
import useAxiosUpdater from "../configuration/useAxiosUpdater";
import useSWRMutation from "swr/mutation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BoxHead from "./BoxHead";
import uploadToS3 from "../helpers/upload";

const ProductEntry = ({ productId = null, productData = {} }) => {
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ query: "(min-width: 768px)" });
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [fileList, setFileList] = useState(productData?.images || []);
  const [loading, setLoading] = useState(false);

  const fetcher = useAxiosFetcher(false);

  const updater = useAxiosUpdater(productId ? "put" : "post");

  const { trigger } = useSWRMutation(
    productId ? `/product/${productId}` : "/product",
    updater,
    {
      onSuccess: () => {
        navigate(`/admin/products`);
      },
    }
  );

  const {
    isLoading,
    data: category,
    error,
  } = useSWR("/category/get-names", fetcher);

  const beforeUpload = (file) => {
    const isValidType = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ].includes(file.type);
    const isValidSize = file.size / 1024 / 1024 < 10;
    if (!isValidType) toast.error("Only JPG/PNG/WEBP files are allowed!");
    if (!isValidSize) toast.error("Image size must be under 10MB!");
    return !(isValidType && isValidSize);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    form.setFieldsValue({ images: { fileList: newFileList } });
  };

  const handleSubmit = async (values) => {
    try {
      //
      setLoading(true);

      const body = { ...values };
      const uploadedFiles = [];

      for (const element of values.images) {
        if (element.status !== "done" && element.originFileObj) {
          const uploadedUrl = await uploadToS3(element);
          uploadedFiles.push({ ...element, url: uploadedUrl, status: "done" });
        } else {
          uploadedFiles.push(element);
        }
      }

      body.images = uploadedFiles;

      if (productId) {
        // Update product

        toast.success("Product updated successfully!");

        trigger(body);
      } else {
        // Create product
        trigger(body);
        toast.success("Product created successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories</p>;
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <section style={{ width: "100%" }}>
      <BoxHead title={productId ? "Update Product" : "Create Product"} />
      <div
        style={{
          padding: "24px",
          maxWidth: "1200px",
          margin: "auto",
          width: "100%",
        }}
      >
        <Form
          form={form}
          initialValues={{
            ...productData,
            categoryId: productData.category?.id,
          }}
          onFinish={handleSubmit}
          name="ProductEntry"
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: "Please input product name" }]}
          >
            <Input />
          </Form.Item>
          <Flex
            style={{
              width: "100%",
            }}
            wrap={isMobile ? "nowrap" : "wrap"}
            align="center"
            gap={12}
          >
            <Form.Item
              style={{
                width: "100%",
              }}
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please input price" }]}
            >
              <Input addonBefore="$" type="number" />
            </Form.Item>
            <Form.Item
              style={{
                width: "100%",
              }}
              name="stock"
              label="Stock"
              rules={[{ required: true, message: "Please input stock" }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Flex>
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select>
              {category?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Flex
            style={{
              width: "100%",
            }}
            wrap={isMobile ? "nowrap" : "wrap"}
            align="center"
            gap={12}
          >
            <Form.Item
              style={{
                width: "100%",
              }}
              name="brand"
              label="Brand Name"
              rules={[{ required: true, message: "Please input brand name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              style={{
                width: "100%",
              }}
              name="color"
              label="Color"
              rules={[{ required: true, message: "Please input color name" }]}
            >
              <Input />
            </Form.Item>
          </Flex>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={5} />
          </Form.Item>

          <Form.Item
            name="images"
            label="Images"
            getValueFromEvent={(e) => e.fileList}
            rules={[
              {
                required: true,
                message: "Please upload images",
              },
            ]}
          >
            <Upload
              multiple
              listType="picture-card"
              defaultFileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={beforeUpload}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
          {previewImage && (
            <Image
              wrapperStyle={{
                display: "none",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
          <Flex justify="end" align="center" gap={6}>
            <Button type="default" htmlType="reset">
              Reset
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {productId ? "Update Product" : "Create Product"}
            </Button>
          </Flex>
        </Form>
      </div>
    </section>
  );
};

export default ProductEntry;
