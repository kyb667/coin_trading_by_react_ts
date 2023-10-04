import React, { useRef, useState, useEffect } from "react";
// antd
import {
  Button,
  Checkbox,
  Form,
  InputNumber,
  notification,
  Space,
  Input,
} from "antd";
// models
import { Wallet } from "../../../models/Wallet";
import { Language } from "../../../models/Language";

type Props = {
  updateWalletInfo: Function;
} & Language;

type FieldType = {
  money?: number;
  remember?: string;
};

export const ChargeForm: React.FC<Props> = (props) => {
  const [api, contextHolder] = notification.useNotification();

  const onFinish = (values: any) => {
    props.updateWalletInfo(values.money);

    api.open({
      // key,
      message: `${props.language.component.ChargeForm.success.message}`,
      description: ``,
    });
  };
  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 1000 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label={props.language.component.ChargeForm.money.label}
          name="money"
          rules={[
            {
              required: true,
              message: `${props.language.component.ChargeForm.money.rules}`,
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error(
                        `${props.language.component.ChargeForm.remember.rules}`,
                      ),
                    ),
            },
          ]}
        >
          <Checkbox>
            {props.language.component.ChargeForm.remember.message}
          </Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              {props.language.component.ChargeForm.button.label}
            </Button>
            <Button htmlType="reset">
              {props.language.component.ChargeForm.resetButton.label}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
