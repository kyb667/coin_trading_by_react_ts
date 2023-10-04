import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import { TradeMain } from "./TradeMain";
import { TradeTimeline } from "./TradeTimeline";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { TradeInfo } from "../../models/TradeInfo";
import { ChartInfo } from "../../models/ChartInfo";
import { Stock } from "../../common";

type Props = {
  stockInfo: Array<String>[];
  tradeInfo: Array<TradeInfo>[];
  chartInfo: Array<ChartInfo>[];
  onClickFunc: Function;
};

export const TradeGrid: React.FC<Props> = (props) => {
  return (
    <>
      <Row>
        {Stock.map((val) => {
          let beforeV = props.chartInfo[9][val];
          let nowV = props.chartInfo[10][val];
          return (
            <Col span={6}>
              <Statistic
                title={val}
                value={nowV - beforeV}
                precision={2}
                valueStyle={{ color: beforeV <= nowV ? "#3f8600" : "#cf1322" }}
                prefix={
                  beforeV <= nowV ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                }
                suffix="%"
              />
            </Col>
          );
        })}
      </Row>
      <br />
      <Row>
        <Col span={12}>
          <Card>
            <TradeMain
              stockInfo={props.stockInfo}
              onClickFunc={props.onClickFunc}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <TradeTimeline tradeInfo={props.tradeInfo} />
          </Card>
        </Col>
      </Row>
    </>
  );
};
