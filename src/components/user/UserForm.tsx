import React from "react";
import { Button, Checkbox, Form, Input, Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { LoginInput } from "./LoginForm/LoginInput";
import { LoginCheckbox } from "./LoginForm/LoginCheckbox";
import { LoginButton } from "./LoginForm/LoginButton";
import { LoginForm } from "./LoginForm/LoginForm";

import { Language } from "../../models/Language";

type Props = {
  onClickFunc: Function;
} & Language;

export const UserForm: React.FC<Props> = (props) => {
  return (
    <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: 600 }}>
      <Result
        icon={<SmileOutlined />}
        title={props.language.component.UserForm.title.label}
        extra={
          <LoginForm onClickFunc={props.onClickFunc} language={props.language}>
            <LoginInput
              label={props.language.component.UserForm.userId.label}
              name="userId"
              rules={[
                {
                  required: true,
                  message: `${props.language.component.UserForm.userId.rules}`,
                },
              ]}
            >
              <Input />
            </LoginInput>

            <LoginInput
              label={props.language.component.UserForm.password.label}
              name="password"
              rules={[
                {
                  required: true,
                  message: `${props.language.component.UserForm.password.rules}`,
                },
              ]}
            >
              <Input.Password />
            </LoginInput>

            <LoginButton wrapperCol={{ offset: 8, span: 8 }}>
              <Button type="primary" htmlType="submit">
                {props.language.component.UserForm.loginBtn.label}
              </Button>
            </LoginButton>
            <LoginButton wrapperCol={{ offset: 4, span: 16 }}>
              <a className="login-form-forgot" href="/forgotPassword">
                {props.language.component.UserForm.ForgotPassword.label}
              </a>{" "}
              Or{" "}
              <a href="/signin">
                {props.language.component.UserForm.RegisterNow.label}
              </a>
            </LoginButton>
          </LoginForm>
        }
      />
    </div>
  );
};
