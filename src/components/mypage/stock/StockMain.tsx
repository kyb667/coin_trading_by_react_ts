import React, { useState } from "react";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import { DefaultStock } from "../../../models/StockInfo";
import { useNavigate } from "react-router-dom";

interface DataType {
  key: React.Key;
  StockName: string;
  Description: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "StockName",
    dataIndex: "StockName"
  },
  {
    title: "Description",
    dataIndex: "Description"
  }
];

const data: DataType[] = [];
for (let i of DefaultStock) {
  data.push({
    key: i,
    StockName: `${i}`,
    Description: `London, Park Lane no. ${i}`
  });
}

type Props = {
  updateStockInfo: Function;
};

export const StockMain: React.FC<Props> = (props) => {
  console.log("StockMain レンダリング");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const nav = useNavigate();

  const saveStock = () => {
    props.updateStockInfo(selectedRowKeys);
    nav("/");
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        }
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        }
      }
    ]
  };

  return (
    <>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      <Button onClick={saveStock}>保存</Button>
    </>
  );
};
