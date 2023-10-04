import React from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

import { TradeInfoList } from "../../../models/TradeInfo";
import { Language } from "../../../models/Language";

import {
  Stock,
  TradeType,
  TradeState,
  TradeTypeDict,
  TradeStateDict,
} from "../../../common";

type Props = TradeInfoList & Language;

interface DataType {
  key: React.Key;
  stockName: string;
  tradeMoney: number;
  state: string;
  tradeType: string;
  createdAt: string;
  updatedAt: string;
}

const stockNameFilters: any[] = [];
Stock.forEach((element) =>
  stockNameFilters.push({ text: element, value: element }),
);

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  // console.log("params", pagination, filters, sorter, extra);
};

export const HistoryForm: React.FC<Props> = (props) => {
  const tradeTypeFilters: any[] = [];
  Object.entries(TradeType).forEach(([key, value]) => {
    const val = props.language.common.TradeType[key];
    tradeTypeFilters.push({ text: val, value: val });
  });

  const columns: ColumnsType<DataType> = [
    {
      title: `${props.language.component.History.StockName.label}`,
      dataIndex: "stockName",
      filters: stockNameFilters,
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string | number | boolean, record: DataType) =>
        record.stockName.includes(value.toString()),
    },
    {
      title: `${props.language.component.History.TradeMoney.label}`,
      dataIndex: "tradeMoney",
      sorter: (a, b) => a.tradeMoney - b.tradeMoney,
    },
    {
      title: `${props.language.component.History.TradeType.label}`,
      dataIndex: "tradeType",
      filters: tradeTypeFilters,
      onFilter: (value: string | number | boolean, record: DataType) =>
        record.tradeType.startsWith(value.toString()),
      filterSearch: true,
    },
    {
      title: `${props.language.component.History.TradeState.label}`,
      dataIndex: "state",
    },
    {
      title: `${props.language.component.History.CreatedAt.label}`,
      dataIndex: "createdAt",
      // width: "30%",
      sorter: (a, b) =>
        new Date(a.createdAt) >= new Date(b.createdAt) ? 1 : -1,
    },
    {
      title: `${props.language.component.History.UpdatedAt.label}`,
      dataIndex: "updatedAt",
      sorter: (a, b) =>
        new Date(a.updatedAt) >= new Date(b.updatedAt) ? 1 : -1,
      // width: "30%",
    },
  ];

  const data: DataType[] = [];

  props.tradeInfo.forEach((element) => {
    if (element.state !== TradeState.SUCCESS) {
      return;
    }
    data.push({
      key: element.id,
      stockName: element.tradeStock,
      state: props.language.common.TradeState[TradeStateDict[element.state]],
      tradeMoney: parseInt(element.tradeMoney),
      tradeType:
        props.language.common.TradeType[TradeTypeDict[element.tradeType]],
      createdAt: element.createdAt,
      updatedAt: element.updatedAt,
    });
  });

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={{ pageSize: 10 }}
    />
  );
};
