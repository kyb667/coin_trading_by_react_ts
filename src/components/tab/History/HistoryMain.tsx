import React, { useRef, useState, useEffect } from "react";
// antd
import { Row, Col, Card, Tour } from "antd";
import type { TourProps } from "antd";
// component
import { HistoryForm } from "./HistoryForm";
// models
import { TradeInfoList } from "../../../models/TradeInfo";
import { Language } from "../../../models/Language";
import { DescriptionValue } from "../../../models/ShowDescription";
// common
import { DescriptionValueDict } from "../../../common";

type Props = TradeInfoList & Language & DescriptionValue;

export const HistoryMain: React.FC<Props> = (props) => {
  // ------------------------------------------------------------
  // description
  const [open, setOpen] = useState<boolean>(false);
  const ref1 = useRef<HTMLDivElement>(null);

  let steps: TourProps["steps"] = [
    {
      title: `${props.language.component.HistoryMain.title}`,
      description: `${props.language.component.HistoryMain.description}`,
      target: () => ref1.current!,
    },
  ];

  useEffect(() => {
    const descriptionValue: number = props.descriptionValue;
    const descriptionValueDict: string = DescriptionValueDict.HISTORY;

    if (descriptionValue.toString() === descriptionValueDict) {
      setOpen(true);
    }
  }, [props.descriptionValue]);

  const onClose = () => {
    setOpen(false);
    props.updateDescriptionValue(DescriptionValueDict.NONTRADING);
  };

  // ------------------------------------------------------------

  return (
    <Row>
      <Col span={24}>
        <Card>
          <div ref={ref1}>
            <HistoryForm
              tradeInfo={props.tradeInfo}
              language={props.language}
            />
          </div>
        </Card>
      </Col>
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
    </Row>
  );
};
