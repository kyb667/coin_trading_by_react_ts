import React from "react";
import { Timeline } from "antd";
import { TradeInfo } from "../../models/TradeInfo";

type Props = {
  tradeInfo: Array<TradeInfo>[];
};

export const TradeTimeline: React.FC<Props> = (props) => {
  const makeItem = (data: TradeInfo[]) => {
    let color, tradeTypeStr;
    switch (data.tradeType) {
      case "1":
        color = "blue";
        tradeTypeStr = "買い";
        break;
      case "2":
        color = "red";
        tradeTypeStr = "売り";
        break;
      case "3":
        color = "gray";
        tradeTypeStr = "予約";
        break;
    }

    if (data.state === "1") {
      color = "green";
    }

    const children = `${data.tradeStock} : ${data.message}（${tradeTypeStr}）`;

    let returnData = {
      color: color,
      children: children
    };

    return returnData;
  };

  return (
    <>
      <div>タイムライン</div>
      <br />
      <Timeline items={props.tradeInfo.map((val) => makeItem(val))} />
    </>
  );
};
