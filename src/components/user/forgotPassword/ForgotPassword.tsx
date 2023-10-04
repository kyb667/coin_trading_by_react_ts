import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Select, Space, Tooltip, Typography } from "antd";

const { Option } = Select;

import { patchUserPassword } from "../../../axios/DB";
import { StateCode, UrlPath } from "../../../common";

import { Language } from "../../../models/Language";

type Props = Language;

export const ForgotPassword: React.FC<Props> = (props) => {
  const nav = useNavigate();

  const onFinish = async (values: any) => {
    const code = await patchUserPassword(values.userId, values.password);

    if (code === StateCode.SUCCESS) {
      alert(`${props.language.component.ForgotPassword.successAlert}`);
      nav(UrlPath.MAIN);
    } else {
      alert(`${props.language.component.ForgotPassword.userIdAlert}`);
    }
  };

  return (
    <Form
      name="complex-form"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
    >
      <Form.Item label={props.language.component.ForgotPassword.userId.label}>
        <Space>
          <Form.Item
            name="userId"
            noStyle
            rules={[
              {
                required: true,
                message: `${props.language.component.ForgotPassword.userId.rules}`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Space>
      </Form.Item>
      <Form.Item label={props.language.component.ForgotPassword.password.label}>
        <Space>
          <Form.Item
            name="password"
            noStyle
            rules={[
              {
                required: true,
                message: `${props.language.component.ForgotPassword.password.rules}`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Space>
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          {props.language.component.ForgotPassword.updateBtn.label}
        </Button>
      </Form.Item>
    </Form>
  );
};
