import React, { useRef, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Tour } from "antd";
import type { TourProps } from "antd";

// models
import { ChartInfo, ChartInfoList } from "../../models/ChartInfo";
import { StockInfo } from "../../models/StockInfo";
import { DescriptionValue } from "../../models/ShowDescription";
import { Language } from "../../models/Language";
// common
import { UrlPath, DescriptionValueDict } from "../../common";

type Props = {
  updateDescriptionValue: Function;
} & ChartInfoList &
  StockInfo &
  Language &
  DescriptionValue;

export const ChartMain: React.FC<Props> = (props) => {
  // console.debug("ChartMain レンダリング");

  const [open, setOpen] = useState<boolean>(false);
  const ref1 = useRef<HTMLDivElement>(null);
  let steps: TourProps["steps"] = [
    {
      title: `${props.language.component.ChartMain.title}`,
      description: `${props.language.component.ChartMain.description}`,
      target: () => ref1.current!,
    },
  ];

  useEffect(() => {
    const descriptionValue: number = props.descriptionValue;
    const descriptionValueDict: string = DescriptionValueDict.CHART;

    if (descriptionValue.toString() === descriptionValueDict) {
      setOpen(true);
    }
  }, [props.descriptionValue]);

  const onClose = () => {
    setOpen(false);
    props.updateDescriptionValue(DescriptionValueDict.TRADEGRID);
  };

  return (
    <>
      <div ref={ref1}>
        <ResponsiveContainer width={"100%"} aspect={4}>
          <LineChart
            data={props.chartInfo}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
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
