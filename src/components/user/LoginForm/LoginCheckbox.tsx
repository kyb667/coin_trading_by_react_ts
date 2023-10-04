import { Form } from "antd";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  name: string;
  valuePropName: string;
  wrapperCol: { [name: string]: number };
};

export const LoginCheckbox: React.FC<Props> = (props) => {
  console.log(props);
  return (
    <Form.Item
      // name={props.name}
      valuePropName={props.valuePropName}
      wrapperCol={props.wrapperCol}
    >
      {props.children}
    </Form.Item>
  );
};
