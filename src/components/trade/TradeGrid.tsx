import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// antd
import { Card, Col, Row, Statistic, Tour } from "antd";
import type { TourProps } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
// components
import { TradeMain } from "./TradeMain";
import { TradeTimeline } from "./TradeTimeline";
// models
import { TradeInfo } from "../../models/TradeInfo";
import { ChartInfo } from "../../models/ChartInfo";
import { Language } from "../../models/Language";
import { UserInfoList } from "../../models/UserInfo";
import { Wallet, WalletStockList } from "../../models/Wallet";
import { DescriptionValue } from "../../models/ShowDescription";
// common
import { Stock, DescriptionValueDict, UrlPath } from "../../common";

type Props = {
  stockInfo: Array<String>;
  tradeInfo: Array<TradeInfo>;
  chartInfo: Array<ChartInfo>;
  updateTradeInfo: Function;
  updateWalletInfo: Function;
  updateWalletStockInfo: Function;
  updateDescriptionValue: Function;
} & UserInfoList &
  Wallet &
  Language &
  WalletStockList &
  DescriptionValue;

export const TradeGrid: React.FC<Props> = (props) => {
  const nav = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  let steps: TourProps["steps"] = [
    {
      title: `${props.language.component.TradeGrid.Trade.title}`,
      description: `${props.language.component.TradeGrid.Trade.title}`,
      target: () => ref1.current!,
    },
    {
      title: `${props.language.component.TradeGrid.TradeMain.title}`,
      description: `${props.language.component.TradeGrid.TradeMain.title}`,
      target: () => ref2.current!,
    },
    {
      title: `${props.language.component.TradeGrid.TradeTimeline.title}`,
      description: `${props.language.component.TradeGrid.TradeTimeline.title}`,
      target: () => ref3.current!,
    },
  ];

  useEffect(() => {
    const descriptionValue: number = props.descriptionValue;
    const descriptionValueDict: string = DescriptionValueDict.TRADEGRID;

    if (descriptionValue.toString() === descriptionValueDict) {
      setOpen(true);
    }
  }, [props.descriptionValue]);

  const onClose = () => {
    setOpen(false);
    props.updateDescriptionValue(DescriptionValueDict.SELECTSTOCK);
    nav(`${UrlPath.STOCK}`);
  };

  return (
    <>
      {/* 株式ごとの推移表示 */}
      <div ref={ref1}>
        <Row>
          {Stock.map((val: string, index: number) => {
            let beforeV = parseInt(props.chartInfo[9][val]);
            let nowV = parseInt(props.chartInfo[10][val]);
            return (
              <Col span={6} key={index}>
                <Statistic
                  title={val}
                  value={nowV - beforeV}
                  precision={2}
                  valueStyle={{
                    color: beforeV <= nowV ? "#3f8600" : "#cf1322",
                  }}
                  prefix={
                    beforeV <= nowV ? (
                      <ArrowUpOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )
                  }
                  suffix="%"
                />
              </Col>
            );
          })}
        </Row>
      </div>
      <br />
      <Row>
        {/* 取引画面表示 */}
        <Col span={12}>
          <Card>
            <div ref={ref2}>
              <TradeMain
                stockInfo={props.stockInfo}
                chartInfo={props.chartInfo}
                updateTradeInfo={props.updateTradeInfo}
                wallet={props.wallet}
                language={props.language}
                tradeInfo={props.tradeInfo}
                userInfo={props.userInfo}
                updateWalletInfo={props.updateWalletInfo}
                walletStock={props.walletStock}
                updateWalletStockInfo={props.updateWalletStockInfo}
              />
            </div>
          </Card>
        </Col>
        {/* タイムライン表示 */}
        <Col span={12}>
          <Card>
            <div ref={ref3}>
              <TradeTimeline
                tradeInfo={props.tradeInfo}
                language={props.language}
              />
            </div>
          </Card>
        </Col>
      </Row>
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
