import React from "react";
import { Button, Form, InputNumber, Select, Space } from "antd";

import { getDate } from "../chart/AutoData";

import { TradeState, TradeType, DbName, StockEnum } from "../../common";

import { insertData } from "../../axios/crud";

import { UserInfoList } from "../../models/UserInfo";
import { TradeInfo } from "../../models/TradeInfo";
import { ChartInfo, ChartInfoList } from "../../models/ChartInfo";
import { StockInfo } from "../../models/StockInfo";
import { Language } from "../../models/Language";
import { Wallet, WalletStockList } from "../../models/Wallet";

const { Option } = Select;

type Props = {
  updateTradeInfo: Function;
  updateWalletInfo: Function;
  updateWalletStockInfo: Function;
  tradeInfo: Array<TradeInfo>;
} & ChartInfoList &
  StockInfo &
  Language &
  Wallet &
  UserInfoList &
  WalletStockList;

export const TradeMain: React.FC<Props> = (props) => {
  const [form] = Form.useForm();
  // console.debug("TradeMain");

  const onCheck = async (tradeId: TradeType) => {
    try {
      const values = await form.validateFields();

      let data: TradeInfo = {
        id: Math.floor(Math.random() * 1e9).toString(),
        createdAt: getDate(new Date()),
        updatedAt: getDate(new Date()),
        tradeStock: values.stock,
        tradeType: tradeId,
        tradeMoney: values.money.toString(),
        state: TradeState.WAIT,
        userId: props.userInfo[0].userId,
      };

      // 売りの場合
      if (tradeId === TradeType.SELL) {
        // console.log(props.walletStock);
        let dump = { ...props.walletStock };
        const stock = StockEnum[`${values.stock}` as keyof typeof StockEnum];
        let dumpStock = dump[stock]!;

        // 売れる株式あり？
        if (
          dumpStock[TradeType.BUY]![TradeState.SUCCESS]! !== 0 &&
          dumpStock[TradeType.BUY]![TradeState.SUCCESS]! -
            dumpStock[TradeType.SELL]![TradeState.WAIT]! >
            0
        ) {
          // 現在の株価と比べて高い？
          if (parseInt(props.chartInfo[10][values.stock]) >= values.money) {
            data["state"] = TradeState.SUCCESS;
            dumpStock[TradeType.BUY]![TradeState.SUCCESS]! -= 1;

            props.updateWalletInfo(values.money);
          } else {
            dumpStock[TradeType.SELL]![TradeState.WAIT]! += 1;
          }
          // console.log(dumpStock);
          // 注文データをDBに保存
          const _ = await insertData(DbName.TRADE_DB, data);
          props.updateWalletStockInfo({
            ...props.walletStock,
            [stock]: dumpStock,
          });
          props.updateTradeInfo(data);
        } else {
          alert(`${props.language.component.TradeMain.notFoundStockAlert}`);
        }
      } else {
        switch (tradeId) {
          // 買い
          case TradeType.BUY:
            if (parseInt(props.chartInfo[10][values.stock]) <= values.money) {
              data["state"] = TradeState.SUCCESS;
            }
            break;
          // 予約
          case TradeType.RESERVATION:
            // TODO
            break;
        }

        if (props.wallet >= values.money) {
          const _ = await insertData(DbName.TRADE_DB, data);

          props.updateTradeInfo(data);
          props.updateWalletInfo(values.money * -1);
        } else {
          alert(`${props.language.component.TradeMain.noMoneyAlert}`);
        }
      }
    } catch (errorInfo) {
      console.error(errorInfo);
    }
  };

  return (
    <>
      <Form
        form={form}
        style={{
          backgroundColor: "whitesmoke",
          maxWidth: 300,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Form.Item label="">
          {props.language.component.TradeMain.title.label}
        </Form.Item>
        <Form.Item label={props.language.component.TradeMain.stock.label}>
          <Space.Compact>
            <Form.Item
              name="stock"
              noStyle
              rules={[
                {
                  required: true,
                  message: `${props.language.component.TradeMain.stock.rules}`,
                },
              ]}
            >
              <Select placeholder="Select Stock">
                {props.stockInfo.map((value, index) => (
                  <Option key={index} value={value}>
                    {value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Space.Compact>
        </Form.Item>
        <Form.Item
          label={props.language.component.TradeMain.money.label}
          style={{ marginBottom: 0 }}
        >
          <Form.Item
            name="money"
            rules={[
              {
                required: true,
                message: `${props.language.component.TradeMain.money.rules}`,
              },
            ]}
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
          <Button type="primary" ghost onClick={() => onCheck(TradeType.BUY)}>
            {props.language.component.TradeMain.buyBtn.label}
          </Button>
          <Button danger onClick={() => onCheck(TradeType.SELL)}>
            {props.language.component.TradeMain.sellBtn.label}
          </Button>
          {/* <Button type="dashed" onClick={() => onCheck(TradeType.RESERVATION)}>
            {props.language.component.TradeMain.reservationBtn.label}
          </Button> */}
        </Space>
      </Form>
    </>
  );
};
