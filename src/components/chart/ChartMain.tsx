import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import { ChartInfo } from "../../models/ChartInfo";

type Props = {
  chartInfo: Array<ChartInfo>[];
  stockInfo: Array<String>[];
};

export const ChartMain: React.FC<Props> = (props) => {
  console.log("ChartMain レンダリング");
  return (
    <ResponsiveContainer width={"100%"} aspect={4}>
      <LineChart
        data={props.chartInfo}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {props.stockInfo.includes("btc") ? (
          <Line
            type="monotone"
            dataKey="btc"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        ) : null}
        {props.stockInfo.includes("etc") ? (
          <Line type="monotone" dataKey="etc" stroke="#82ca9d" />
        ) : null}
        {props.stockInfo.includes("eth") ? (
          <Line type="monotone" dataKey="eth" stroke="#cfd966" />
        ) : null}
        {props.stockInfo.includes("xrp") ? (
          <Line type="monotone" dataKey="xrp" stroke="#ad52d1" />
        ) : null}
        {props.stockInfo.includes("sol") ? (
          <Line type="monotone" dataKey="sol" stroke="#db9e4f" />
        ) : null}
      </LineChart>
    </ResponsiveContainer>
  );
};
