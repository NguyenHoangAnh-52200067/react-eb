import { Button, Flex, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import useAxiosUpdater from "../configuration/useAxiosUpdater";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";
const ChangeUserInfo = ({ info, mutate }) => {
  const [open, setOpen] = useState(false);

  const axiosUpdater = useAxiosUpdater("put");

  const { trigger, isMutating } = useSWRMutation("/auth/info", axiosUpdater, {
    onSuccess: () => {
      mutate();
    },
  });

  const handleFinish = (values) => {
    try {
      trigger(values);
      toast.success("Updated successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Button type="dashed" onClick={() => setOpen(true)}>
        Change Info
      </Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Change User Information"
        footer={null}
      >
        <Form
          initialValues={info}
          onFinish={handleFinish}
          name="changeUserInfo"
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Email" disabled />
          </Form.Item>

          <Form.Item
            name={"phoneNumber"}
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input placeholder="Telephone" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please input your gender ",
              },
            ]}
          >
            <Select placeholder="Select your gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={"address"}
            label="Address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Address" />
          </Form.Item>
          <Flex justify="end" gap={12}>
            <Button htmlType="reset">Reset</Button>
            <Button loading={isMutating} htmlType="submit" type="primary">
              Submit
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

export default ChangeUserInfo;
