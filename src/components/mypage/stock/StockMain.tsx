import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// antd
import { Button, Table, Tour } from "antd";
import type { TourProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
// models
import { Language } from "../../../models/Language";
import { UserInfoList } from "../../../models/UserInfo";
import { DescriptionValue } from "../../../models/ShowDescription";
// common
import { Stock, DescriptionValueDict, UrlPath } from "../../../common";
// db
import { patchUserStock } from "../../../axios/DB";

interface DataType {
  key: React.Key;
  StockName: string;
  Description: string;
}

const data: DataType[] = [];
for (let i of Stock) {
  data.push({
    key: i,
    StockName: `${i}`,
    Description: `${i}`,
  });
}

type Props = {
  updateStockInfo: Function;
  updateDescriptionValue: Function;
} & UserInfoList &
  Language &
  DescriptionValue;

export const StockMain: React.FC<Props> = (props) => {
  // console.debug("StockMain レンダリング");

  // ------------------------------------------------------------
  // description
  const [open, setOpen] = useState<boolean>(false);
  const ref1 = useRef<HTMLDivElement>(null);

  let steps: TourProps["steps"] = [
    {
      title: `${props.language.component.StockMain.title}`,
      description: `${props.language.component.StockMain.description}`,
      target: () => ref1.current!,
    },
  ];

  useEffect(() => {
    const descriptionValue: number = props.descriptionValue;
    const descriptionValueDict: string = DescriptionValueDict.SELECTSTOCK;

    if (descriptionValue.toString() === descriptionValueDict) {
      setOpen(true);
    }
  }, [props.descriptionValue]);

  const onClose = () => {
    setOpen(false);
    props.updateDescriptionValue(DescriptionValueDict.MYINFO);
    nav(`${UrlPath.MYINFO}`);
  };

  // ------------------------------------------------------------
  // table setting

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: ColumnsType<DataType> = [
    {
      title: `${props.language.component.StockMain.stockName.label}`,
      dataIndex: "StockName",
    },
    {
      title: `${props.language.component.StockMain.Description.label}`,
      dataIndex: "Description",
    },
  ];

  const nav = useNavigate();

  const saveStock = async () => {
    // console.debug("saveStock start");
    props.updateStockInfo(selectedRowKeys);
    await patchUserStock(props.userInfo[0].userId, selectedRowKeys);
    nav(`${UrlPath.MAIN}`);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
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
        },
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
        },
      },
    ],
  };

  // ------------------------------------------------------------

  return (
    <>
      <div ref={ref1}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
        <Button onClick={saveStock}>
          {props.language.component.StockMain.button.label}
        </Button>
      </div>
      <Tour
        open={open}
        onClose={onClose}
        steps={steps}
        indicatorsRender={(current, total) => (
          <span>
            {current + 1} / {total}
          </span>
        )}
      />
    </>
  );
};
