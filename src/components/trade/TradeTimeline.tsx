import React, { useEffect, useState } from "react";
import VirtualList from "rc-virtual-list";
import { Avatar, Divider, List, Skeleton } from "antd";
import { Timeline } from "antd";
import { TradeInfo, TradeInfoList } from "../../models/TradeInfo";
import { Language } from "../../models/Language";
import { CheckOutlined } from "@ant-design/icons";

import { TradeType, TradeState } from "../../common";

type Props = {
  language: Language;
} & TradeInfoList;

export const TradeTimeline: React.FC<Props> = (props) => {
  // console.debug("TradeTimeline");

  let dataList: any[] = [];

  props.tradeInfo.forEach((data) => {
    let state, tradeTypeStr;
    switch (data.tradeType) {
      case TradeType.BUY:
        tradeTypeStr = `${props.language.common.TradeType.BUY}`;
        break;
      case TradeType.SELL:
        tradeTypeStr = `${props.language.common.TradeType.SELL}`;
        break;
      case TradeType.RESERVATION:
        tradeTypeStr = `${props.language.common.TradeType.RESERVATION}`;
        break;
    }

    switch (data.state) {
      case TradeState.WAIT:
        state = false;
        break;

      case TradeState.SUCCESS:
        state = true;
        break;
    }

    let returnData = null;

    const title = `${data.tradeStock} : ${data.createdAt}（${tradeTypeStr}）`;
    returnData = {
      title: title,
      state: state,
      key: data.id,
    };
    dataList.push(returnData);
  });

  return (
    <>
      <div>{props.language.component.TradeTimeline.title.label}</div>
      <br />
      <List>
        <VirtualList data={dataList} height={300} itemHeight={30} itemKey="key">
          {(item: any) => (
            <List.Item key={item.key}>
              <List.Item.Meta title={<a>{item.title}</a>} />
              <>{item.state ? <CheckOutlined /> : null}</>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </>
  );
};
