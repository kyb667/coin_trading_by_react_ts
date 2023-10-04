import React, { useEffect } from "react";
import { Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { Routes, Route } from "react-router-dom";

import { UserForm } from "../components/user/UserForm";
import { TopPageHandler } from "./TopPageContainers";
import { IntranetMain } from "./Intranet/IntranetMain";
import { StockMain } from "./mypage/stock/StockMain";
import { TradeMain } from "./trade/TradeMain";
import { TradeGrid } from "./trade/TradeGrid";

import { ChartMain } from "./chart/ChartMain";
import { AutoData } from "./chart/AutoData";

import { UserInfo } from "../models/UserInfo";
import { ChartInfo } from "../models/ChartInfo";
import { TradeInfo } from "../models/TradeInfo";

interface OwnProps {
  userInfo: Array<UserInfo>[];
  chartInfo: Array<ChartInfo>[];
  stockInfo: Array<String>[];
  tradeInfo: Array<TradeInfo>[];
}

type Props = OwnProps & TopPageHandler;

export const Main: React.FC<Props> = (props) => {
  useEffect(() => {
    AutoData(props);
  }, []);

  useEffect(() => {
    console.log("chartInfo Change");

    if (props.tradeInfo.length > 0) {
      for (let i of props.tradeInfo) {
        // 待機の注文のにチェック
        if (i.state === "0") {
          if (props.chartInfo[10][i.tradeStock] >= i.tradeMoney) {
            let d = { ...i, state: "1" };
            console.log(d);
            props.updateTradeInfo(d);
          }
        }
      }
    }
  }, [props.chartInfo]);

  return (
    <Routes>
      <>
        <Route
          path="/"
          element={
            props.userInfo.length > 0 ? (
              <IntranetMain>
                <ChartMain
                  chartInfo={props.chartInfo}
                  stockInfo={props.stockInfo}
                />
                <br />
                <TradeGrid
                  stockInfo={props.stockInfo}
                  tradeInfo={props.tradeInfo}
                  chartInfo={props.chartInfo}
                  onClickFunc={props.updateTradeInfo}
                />
              </IntranetMain>
            ) : (
              <Result
                icon={<SmileOutlined />}
                title="Welcom, Deloitte!"
                extra={<UserForm onClickFunc={props.handleOnClick} />}
              />
            )
          }
        />
        {props.userInfo.length > 0 ? (
          <Route
            path="/myStock"
            element={
              <IntranetMain>
                <StockMain updateStockInfo={props.updateStockInfo} />
              </IntranetMain>
            }
          />
        ) : null}
        <Route path="*" element={<div> page not found</div>} />
      </>
    </Routes>
  );
};
