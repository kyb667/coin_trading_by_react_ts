import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { LoginInput } from "./LoginForm/LoginInput";
import { LoginCheckbox } from "./LoginForm/LoginCheckbox";
import { LoginButton } from "./LoginForm/LoginButton";
import { LoginForm } from "./LoginForm/LoginForm";

type Props = {
  onClickFunc: Function;
};

export const UserForm: React.FC<Props> = (props) => {
  return (
    <>
      <LoginForm onClickFunc={props.onClickFunc}>
        <LoginInput
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </LoginInput>

        <LoginInput
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </LoginInput>

        <LoginCheckbox
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </LoginCheckbox>

        <LoginButton wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </LoginButton>
      </LoginForm>
    </>
  );
};
