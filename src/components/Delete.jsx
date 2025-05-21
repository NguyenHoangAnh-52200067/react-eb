import { Button, Popconfirm } from "antd";
import useSubmit from "../configuration/useSubmit";
import { toast } from "react-toastify";

const Delete = ({ endpoint, task, mutate }) => {
  const { loading: isMutating, submit } = useSubmit("delete");

  const confirm = async () => {
    try {
      const res = await submit({}, endpoint);
      if (res) {
        mutate();
        toast.success("Delete successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  return (
    <Popconfirm
      title={`Delete the ${task}?`}
      description={`Are you sure to delete this ${task}?`}
      onConfirm={confirm}
      okText="Yes"
      cancelText="No"
    >
      <Button disabled={isMutating} type="primary" size="small" danger>
        Delete
      </Button>
    </Popconfirm>
  );
};

export default Delete;
