import React from "react";
import { Table } from "antd";

import { TradeInfoList } from "../../../../models/TradeInfo";
import { Language } from "../../../../models/Language";

import { calcMoney } from "../calcMoney";

type Props = TradeInfoList & Language;

export const MoneyForm: React.FC<Props> = (props) => {
  // console.debug("MoneyForm レンダリング");

  let stockData = calcMoney(props.tradeInfo);

  return (
    <Table
      columns={[
        {
          title: `${props.language.component.MoneyForm.StockName.label}`,
          dataIndex: "stockName",
          key: "stockName",
        },
        {
          title: `${props.language.component.MoneyForm.StockCnt.label}`,
          dataIndex: "stockCnt",
          key: "stockCnt",
        },
        {
          title: `${props.language.component.MoneyForm.waiteAveragePrice.label}`,
          dataIndex: "waiteAveragePrice",
          key: "waiteAveragePrice",
        },
        {
          title: `${props.language.component.MoneyForm.successAveragePrice.label}`,
          dataIndex: "successAveragePrice",
          key: "successAveragePrice",
        },
        {
          title: `${props.language.component.MoneyForm.allAveragePrice.label}`,
          dataIndex: "allPrice",
          key: "allPrice",
        },
      ]}
      pagination={{ pageSize: 5 }}
      dataSource={Object.values(stockData)}
    />
  );
};
