import { LockFilled } from "@ant-design/icons";
import { Button, Flex, Form, Input, Modal } from "antd";
import { useState } from "react";
import useAxiosUpdater from "../configuration/useAxiosUpdater";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const fetcher = useAxiosUpdater("put");

  const { trigger, isMutating } = useSWRMutation("/auth/change-pwd", fetcher);

  async function handleFinish(values) {
    try {
      await trigger(values);
      toast.success("Password changed successfully!");
      setOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        type="primary"
        danger
        icon={<LockFilled />}
      >
        Change Password
      </Button>

      <Modal
        footer={null}
        open={open}
        onCancel={() => setOpen(false)}
        title="Change Password"
      >
        <Form onFinish={handleFinish} name="changePassword">
          <Form.Item
            name="oldPass"
            label="Old Password"
            rules={[
              {
                required: true,
                message: "Please input your old password!",
              },
            ]}
          >
            <Input.Password placeholder="Old Password" />
          </Form.Item>
          <Form.Item
            name={"newPass"}
            label="New Password"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("oldPass") !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject({
                    message: "New password must be different from the old one!",
                  });
                },
              }),
            ]}
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>

          <Form.Item
            name={"confirmPass"}
            label="Confirm Password"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPass") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Flex justify="end">
            <Button loading={isMutating} type="primary" htmlType="submit">
              Change Password
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePassword;
