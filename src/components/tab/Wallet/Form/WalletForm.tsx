import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { TradeInfoList } from "../../../../models/TradeInfo";
import { Language } from "../../../../models/Language";
import { TradeState, TradeType } from "../../../../common";

import { calcMoney } from "../calcMoney";

type Props = TradeInfoList & Language;

interface DataType {
  key: React.Key;
  stockName: string;
  stockCnt: string;
  allAveragePrice: string;
  // description: string;
}

export const WalletForm: React.FC<Props> = (props) => {
  // console.debug("WalletForm レンダリング");

  let stockData = calcMoney(props.tradeInfo);

  // let stockData: { [name: string]: { [name: string]: string } } = {};

  // for (let i of props.tradeInfo) {
  //   // データ初期化
  //   if (!(i.tradeStock in stockData)) {
  //     stockData[i.tradeStock] = {
  //       key: i.tradeStock,
  //       stockName: i.tradeStock,
  //       averagePrice: i.tradeMoney.toString(),
  //       stockCnt: "0",
  //     };
  //   }

  //   // データ作成
  //   switch (i.tradeType) {
  //     case TradeType.BUY:
  //       let dump = { ...stockData };

  //       let averagePrice =
  //         parseInt(dump[i.tradeStock].averagePrice) *
  //           parseInt(dump[i.tradeStock].stockCnt) +
  //         parseInt(i.tradeMoney);

  //       let stockCnt = parseInt(dump[i.tradeStock].stockCnt) + 1;

  //       dump[i.tradeStock] = {
  //         ...dump[i.tradeStock],
  //         averagePrice: (averagePrice / stockCnt).toString(),
  //         stockCnt: stockCnt.toString(),
  //       };

  //       stockData = dump;

  //       break;

  //     // 売りの場合
  //     case TradeType.SELL:
  //       // 売ったもの？
  //       if (i.state === TradeState.SUCCESS) {
  //         // 買いデータあり？
  //         if (stockData[i.tradeStock].stockCnt !== "0") {
  //           const stockCnt = parseInt(stockData[i.tradeStock].stockCnt);

  //           // 買いデータが1個しかない？
  //           if (stockCnt === 1) {
  //             stockData[i.tradeStock].averagePrice = "0";
  //           }
  //           stockData[i.tradeStock].stockCnt = (stockCnt - 1).toString();
  //         }
  //       }
  //       break;
  //   }
  // }

  return (
    <Table
      columns={[
        {
          title: `${props.language.component.WalletForm.StockName.label}`,
          dataIndex: "stockName",
          key: "stockName",
        },
        {
          title: `${props.language.component.WalletForm.StockCnt.label}`,
          dataIndex: "stockCnt",
          key: "stockCnt",
        },
        {
          title: `${props.language.component.WalletForm.AveragePrice.label}`,
          dataIndex: "allAveragePrice",
          key: "allAveragePrice",
        },
      ]}
      pagination={{ pageSize: 5 }}
      dataSource={Object.values(stockData)}
    />
  );
};
