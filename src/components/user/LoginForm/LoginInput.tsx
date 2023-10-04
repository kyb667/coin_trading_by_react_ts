import { Form } from "antd";
import React from "react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  label: string;
  name: string;
  rules: Array<any>;
};

export const LoginInput: React.FC<Props> = (props) => {
  return (
    <Form.Item label={props.label} name={props.name} rules={props.rules}>
      {props.children}
    </Form.Item>
  );
};
