import { Button, Flex, Form, Input, Modal } from "antd";
import { useState } from "react";

import useSubmit from "../configuration/useSubmit";
import { toast } from "react-toastify";

const AddCategory = ({ mutate }) => {
  const [open, setOpen] = useState(false);

  const { submit, loading } = useSubmit("post");

  const onFinish = async (values) => {
    console.log(values);

    try {
      const res = await submit(values, "/category");
      if (res) {
        toast.success("Category added successfully");
        mutate();
        setOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add Category
      </Button>
      <Modal
        footer={null}
        onCancel={() => setOpen(false)}
        open={open}
        title="Add Category"
      >
        <Form name="add-category" onFinish={onFinish}>
          <Form.Item
            name={"name"}
            label="Category Name"
            rules={[
              {
                required: true,
                message: "Please input category name",
              },
            ]}
          >
            <Input placeholder="Category Name" />
          </Form.Item>
          <Flex gap={15} justify="end">
            <Button htmlType="reset">Reset</Button>
            <Button type="primary" loading={loading} htmlType="submit">
              Add
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

export default AddCategory;
