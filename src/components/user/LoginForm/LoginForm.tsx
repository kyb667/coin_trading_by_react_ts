import React, { ReactNode } from "react";
import { Form } from "antd";

import { UserInfo } from "../../../models/UserInfo";
import { Language } from "../../../models/Language";
import { Login } from "../../../axios/DB";

import { StateCode } from "../../../common";

type Props = {
  children: ReactNode;
  onClickFunc: Function;
} & Language;

export const LoginForm: React.FC<Props> = (props) => {
  const onFinish = async (values: any) => {
    let user: UserInfo = {
      userId: values.userId,
      userName: "",
      password: values.password,
      id: 0,
    };

    const [data, code] = await Login(user);

    if (code === StateCode.ERROR) {
      alert(`${props.language.component.UserForm.alert}`);
    } else {
      props.onClickFunc(data);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      {props.children}
    </Form>
  );
};
