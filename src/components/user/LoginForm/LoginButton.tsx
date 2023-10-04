import { Form } from "antd";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  wrapperCol: { [name: string]: number };
};

export const LoginButton: React.FC<Props> = (props) => {
  return <Form.Item wrapperCol={props.wrapperCol}>{props.children}</Form.Item>;
};
