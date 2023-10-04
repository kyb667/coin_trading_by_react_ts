import React, { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import {
  Button,
  Modal,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Space,
} from "antd";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

import { TradeInfo } from "../../../models/TradeInfo";

import { updateData } from "../../../axios/crud";

import { getDate } from "../../chart/AutoData";

import {
  TradeState,
  TradeType,
  StockEnum,
  Stock,
  DbName,
} from "../../../common";

interface Props {
  updateTradeInfo: Function;
  updateWalletInfo: Function;
  modal2Open: boolean;
  setModal2Open: Dispatch<SetStateAction<boolean>>;
  updateData: any[];
}

export const UpdateModal: React.FC<Props> = (props) => {
  // console.debug("UpdateModal");
  // console.debug(props);

  const [form] = Form.useForm();

  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  return (
    <>
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={props.modal2Open}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              const d = {
                ...props.updateData[0],
                ...values,
                updatedAt: getDate(new Date()),
              };
              d["tradeMoney"] = d["tradeMoney"].toString();

              if (d.tradeType !== TradeType.SELL) {
                const beforeMoney = parseInt(props.updateData[0].tradeMoney);
                const newMoney = parseInt(d["tradeMoney"]);

                props.updateWalletInfo(beforeMoney - newMoney);
              }

              props.updateTradeInfo({
                // 注文ID
                id: d.id,
                userId: d.userId,
                // 注文ステータス（0 : 待機 、1: 成功）
                state: d.state,
                // 株式名
                tradeStock: d.tradeStock,
                // 取引タイプ（1 : 買い、2 : 売り、3：予約）
                tradeType: d.tradeType,
                // 注文単価
                tradeMoney: d.tradeMoney,
                // 注文時間
                createdAt: d.createdAt,
                // 更新時間
                updatedAt: d.updatedAt,
              });
              updateData(DbName.TRADE_DB, d.id, {
                ...values,
                updatedAt: getDate(new Date()),
              });
              props.setModal2Open(false);
            })
            .catch((errorInfo) => {
              // console.error(errorInfo);
            });
        }}
        onCancel={() => props.setModal2Open(false)}
      >
        <br />
        {props.updateData.map((val) => (
          <div key={val.id}>
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              style={{ maxWidth: 600 }}
              form={form}
              validateMessages={validateMessages}
            >
              <Form.Item label="id">
                <Input value={val.id} disabled />
              </Form.Item>
              <Form.Item label="state">
                <Input value={val.state} disabled />
              </Form.Item>
              <Form.Item
                label="tradeMoney"
                name="tradeMoney"
                rules={[{ required: true, type: "number", min: 1, max: 10 }]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item label="tradeStock">
                <Input value={val.tradeStock} disabled />
              </Form.Item>
              <Form.Item label="tradeType">
                <Input value={val.tradeType} disabled />
              </Form.Item>
              <Form.Item label="createdAt">
                <Input value={val.createdAt} disabled />
              </Form.Item>
            </Form>
          </div>
        ))}
      </Modal>
    </>
  );
};
