import { Button, Flex, Form, Input, Modal } from "antd";
import { useState } from "react";

import useSubmit from "../configuration/useSubmit";
import { toast } from "react-toastify";

const EditCategory = ({ category, mutate }) => {
  const [open, setOpen] = useState(false);

  const { submit, loading } = useSubmit("put");

  const onFinish = async (values) => {
    try {
      try {
        const res = await submit(values, `/category/${category.id}`);

        if (res) {
          mutate();
          setOpen(false);
          toast.success("Category updated successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to update category");
      }

      mutate();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Button size="small" type="primary" onClick={() => setOpen(true)}>
        Edit
      </Button>

      <Modal
        title="Edit Category"
        open={open}
        footer={null}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={category}
          name="edit-category"
        >
          <Form.Item
            name={"name"}
            label="Category Name"
            rules={[
              {
                required: true,
                message: "Please input the category name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Flex justify="end" gap={15}>
            <Button htmlType="reset">Reset</Button>
            <Button loading={loading} type="primary" htmlType="submit">
              Save
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

export default EditCategory;
