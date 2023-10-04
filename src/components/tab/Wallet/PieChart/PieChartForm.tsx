import React, { useCallback, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector,
  Label,
} from "recharts";
import { TradeInfoList, TradeInfo } from "../../../../models/TradeInfo";
import { Wallet } from "../../../../models/Wallet";
import { TradeState, TradeType } from "../../../../common";

import { calcMoney } from "../calcMoney";

type Props = Wallet & TradeInfoList;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

export const PieChartForm: React.FC<Props> = (props) => {
  // console.debug("PieChartForm レンダリング");

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: any) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  let stockData = calcMoney(props.tradeInfo);

  let Data: { [name: string]: number } = {};

  for (let i in stockData) {
    Data[stockData[i].stockName] = parseInt(stockData[i].allPrice);
  }

  const data = [
    {
      name: "myMoney",
      value:
        props.wallet === 0
          ? Object.keys(Data).length === 0
            ? 1
            : 0
          : props.wallet,
    },
  ];
  for (let [key, value] of Object.entries(Data)) {
    data.push({ name: key, value: value });
  }

  return (
    <ResponsiveContainer height={400} width="100%">
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          innerRadius={80}
          outerRadius={100}
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
