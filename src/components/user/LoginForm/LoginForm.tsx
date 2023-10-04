import React, { ReactNode } from "react";
import { Form } from "antd";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type Props = {
  children: ReactNode;
  onClickFunc: Function;
};

type UserInfo = {
  username: string;
  password: string;
};

export const LoginForm: React.FC<Props> = (props) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);

    let arrays: Array<UserInfo>[] = [];

    arrays.push(values);

    console.log(arrays);

    props.onClickFunc(arrays);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {props.children}
    </Form>
  );
};
