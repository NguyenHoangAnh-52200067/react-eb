import { Button, Result, Space } from "antd";
import React from "react";

const OrderResult = () => {
  return (
    <Result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      subTitle={
        <>
          <Space direction="vertical">
            <div>Order number: 2017182818828182881</div>
            <div>Time: 2018-04-24 18:00:00</div>
          </Space>
        </>
      }
      extra={[
        <Button type="primary" key="console">
          Go Console
        </Button>,
        <Button key="buy">Buy Again</Button>,
      ]}
    />
  );
};

export default OrderResult;
