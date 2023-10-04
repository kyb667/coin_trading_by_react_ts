import React, { useState } from "react";
import { Table, Popconfirm } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

import { UpdateModal } from "./UpdateModal";

import { TradeInfoList, TradeInfo } from "../../../models/TradeInfo";
import { Language } from "../../../models/Language";

import { deleteData } from "../../../axios/crud";

import {
  Stock,
  TradeType,
  TradeState,
  TradeTypeDict,
  TradeStateDict,
  DbName,
} from "../../../common";

type Props = {
  updateTradeInfo: Function;
  updateTradeListInfo: Function;
  updateWalletInfo: Function;
} & TradeInfoList &
  Language;

interface DataType {
  id: React.Key;
  userId: string;
  state: string;
  tradeStock: string;
  tradeType: string;
  tradeMoney: string;
  createdAt: string;
  updatedAt: string;

  type: string;
  tradeState: string;
}

const tradeStockFilters: any[] = [];
Stock.forEach((element) =>
  tradeStockFilters.push({ text: element, value: element }),
);

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  // console.log("params", pagination, filters, sorter, extra);
};

export const NonTradingForm: React.FC<Props> = (props) => {
  // console.debug("NonTradingForm レンダリング");

  const [modal2Open, setModal2Open] = useState(false);

  const [updateData, setUpdateData] = useState<TradeInfo[]>([]);

  // 注文タイプのフィルター作成
  const tradeTypeFilters: any[] = [];
  Object.entries(TradeType).forEach(([key, value]) => {
    const val = props.language.common.TradeType[key];
    tradeTypeFilters.push({ text: val, value: val });
  });

  // カラムデータ作成
  const columns: ColumnsType<DataType> = [
    {
      title: `${props.language.component.History.StockName.label}`,
      dataIndex: "tradeStock",
      filters: tradeStockFilters,
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string | number | boolean, record: DataType) =>
        record.tradeStock.includes(value.toString()),
    },
    {
      title: `${props.language.component.History.TradeMoney.label}`,
      dataIndex: "tradeMoney",
      sorter: (a, b) => parseInt(a.tradeMoney) - parseInt(b.tradeMoney),
    },
    {
      title: `${props.language.component.History.TradeType.label}`,
      dataIndex: "type",
      filters: tradeTypeFilters,
      onFilter: (value: string | number | boolean, record: DataType) =>
        record.type.startsWith(value.toString()),
      filterSearch: true,
    },
    {
      title: `${props.language.component.History.TradeState.label}`,
      dataIndex: "tradeState",
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
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) =>
        props.tradeInfo.length >= 1 ? (
          <>
            <Popconfirm
              title="Sure to Update?"
              onConfirm={() => handleUpdate(record)}
            >
              <a>Update</a>
            </Popconfirm>
            {"  "}
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record)}
            >
              <a>Delete</a>
            </Popconfirm>
          </>
        ) : null,
    },
  ];

  const handleDelete = (recode: any) => {
    const newData = props.tradeInfo.filter((item) => item.id !== recode.id);
    deleteData(DbName.TRADE_DB, recode.id);
    props.updateTradeListInfo(newData);
    props.updateWalletInfo(parseInt(recode.tradeMoney));
  };

  const handleUpdate = (recode: any) => {
    setUpdateData([recode]);
    setModal2Open(true);
  };

  const data: DataType[] = [];

  props.tradeInfo.forEach((element) => {
    if (element.state !== TradeState.WAIT) {
      return;
    }

    data.push({
      ...element,
      tradeState:
        props.language.common.TradeState[TradeStateDict[element.state]],
      type: props.language.common.TradeType[TradeTypeDict[element.tradeType]],
    });
  });

  return (
    <>
      <UpdateModal
        modal2Open={modal2Open}
        setModal2Open={setModal2Open}
        updateData={updateData}
        updateTradeInfo={props.updateTradeInfo}
        updateWalletInfo={props.updateWalletInfo}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};
