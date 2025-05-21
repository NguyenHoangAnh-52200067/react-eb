import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Image, Modal, Upload } from "antd";
import { useState } from "react";
import { getBase64 } from "../helpers";
import { useForm } from "antd/es/form/Form";
import useAxiosFecher from "../configuration/useAxiosUpdater";
import useSWRMutation from "swr/mutation";
import useAuthStore from "../store/AuthStore";
import { toast } from "react-toastify";
import uploadToS3 from "../helpers/upload";
const ChangeAvatar = ({ mutate }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const setAvatar = useAuthStore((state) => state.setAvatar);

  const fetcher = useAxiosFecher("put");
  const { trigger } = useSWRMutation("/auth/avatar", fetcher, {
    onSuccess: () => {
      mutate();
    },
  });

  const handleFinish = async (value) => {
    try {
      setLoading(true);

      console.log(value);

      const avatar = await uploadToS3(value.avatar);
      trigger({ avatar });

      setAvatar(avatar);

      toast.success("Avatar uploaded successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload avatar!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const [form] = useForm();
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    form.setFieldsValue({ avatar: newFileList[0] });
  };
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
    <>
      <Button type="primary" variant="link" onClick={() => setOpen(true)}>
        Change Avatar
      </Button>
      <Modal
        title="Change Avatar"
        open={open}
        onOk={() => form.submit()}
        footer={null}
        onCancel={() => setOpen(false)}
        centered
      >
        <Form form={form} onFinish={handleFinish} name="change-avatar">
          <Form.Item
            name="avatar"
            rules={[
              {
                required: true,
                message: "Please upload an avatar!",
              },
            ]}
          >
            <Upload
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
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
          </Form.Item>
          <Flex justify="end" gap={10}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

export default ChangeAvatar;
