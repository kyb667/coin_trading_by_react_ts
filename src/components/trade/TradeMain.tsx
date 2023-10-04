import React from "react";
import { Button, Form, InputNumber, Select, Space } from "antd";
import { TradeInfo } from "../../models/TradeInfo";
import { getDate } from "../chart/AutoData";

const { Option } = Select;

type Props = {
  stockInfo: Array<String>[];
  onClickFunc: Function;
};

export const TradeMain: React.FC<Props> = (props) => {
  const [form] = Form.useForm();

  const onCheck = async (tradeId: string) => {
    try {
      const values = await form.validateFields();
      console.log("Success:", values);

      let data: TradeInfo = {
        id: Math.floor(Math.random() * 1e9).toString(),
        message: getDate(new Date()),
        tradeStock: values.stock,
        tradeType: tradeId,
        tradeMoney: values.money,
        state: "0"
      };

      if (tradeId === "1") {
        console.log("買い");
      } else if (tradeId === "2") {
        console.log("売り");
      } else if (tradeId === "3") {
        console.log("予約");
      }

      props.onClickFunc(data);
    } catch (errorInfo) {}
  };

  return (
    <>
      <Form
        form={form}
        style={{
          backgroundColor: "whitesmoke",
          maxWidth: 300,
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <Form.Item label="">取引</Form.Item>
        <Form.Item label="Stock">
          <Space.Compact>
            <Form.Item
              name="stock"
              noStyle
              rules={[{ required: true, message: "Stock is required" }]}
            >
              <Select placeholder="Select Stock">
                {props.stockInfo.map((value) => (
                  <Option key={value} value={value}>
                    {value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Space.Compact>
        </Form.Item>
        <Form.Item label="Money" style={{ marginBottom: 0 }}>
          <Form.Item
            name="money"
            rules={[{ required: true }]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <InputNumber
              prefix="￥"
              style={{ width: "100%" }}
              min={0}
              max={10}
            />
          </Form.Item>
        </Form.Item>
        <Space>
          <Button type="primary" ghost onClick={() => onCheck("1")}>
            買い
          </Button>
          <Button danger onClick={() => onCheck("2")}>
            売り
          </Button>
          <Button type="dashed" onClick={() => onCheck("3")}>
            予約
          </Button>
        </Space>
      </Form>
    </>
  );
};
