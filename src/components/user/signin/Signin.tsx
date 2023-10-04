import React from "react";
import { Button, Form, Input, Select, Space, Tooltip, Typography } from "antd";

const { Option } = Select;

import { signIn } from "../../../axios/DB";
import { StateCode } from "../../../common";

import { Language } from "../../../models/Language";

type Props = {
  updateUserInfo: Function;
} & Language;

export const Signin: React.FC<Props> = (props) => {
  const onFinish = async (values: any) => {
    // console.debug("Signin.tsx : start ", values);
    const [data, code] = await signIn(values);

    if (code === StateCode.SUCCESS) {
      props.updateUserInfo(data);
    } else {
      alert(`${props.language.component.SignIn.alert}`);
    }
    // console.debug("Signin.tsx : end ", values);
  };

  return (
    <Form
      name="complex-form"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
    >
      <Form.Item label={props.language.component.SignIn.userId.label}>
        <Space>
          <Form.Item
            name="userId"
            noStyle
            rules={[
              {
                required: true,
                message: `${props.language.component.SignIn.userId.rules}`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Space>
      </Form.Item>
      <Form.Item label={props.language.component.SignIn.password.label}>
        <Space>
          <Form.Item
            name="password"
            noStyle
            rules={[
              {
                required: true,
                message: `${props.language.component.SignIn.password.rules}`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Space>
      </Form.Item>
      <Form.Item label={props.language.component.SignIn.username.label}>
        <Space>
          <Form.Item
            name="username"
            noStyle
            rules={[
              {
                required: true,
                message: `${props.language.component.SignIn.username.rules}`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Space>
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          {props.language.component.SignIn.loginBtn.label}
        </Button>
      </Form.Item>
    </Form>
  );
};
