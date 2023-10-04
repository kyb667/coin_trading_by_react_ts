import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// antd
import { Row, Card, Col, Tour } from "antd";
import type { TourProps } from "antd";
// components
import { UpdateModal } from "./UpdateModal";
import { NonTradingForm } from "./NonTradingForm";
// models
import { TradeInfoList, TradeInfo } from "../../../models/TradeInfo";
import { Language } from "../../../models/Language";
import { DescriptionValue } from "../../../models/ShowDescription";
// db
import { deleteData } from "../../../axios/crud";
// common
import { UrlPath, DescriptionValueDict } from "../../../common";

type Props = {
  updateTradeInfo: Function;
  updateTradeListInfo: Function;
  updateDescriptionValue: Function;
  updateWalletInfo: Function;
} & TradeInfoList &
  Language &
  DescriptionValue;

export const NonTradingMain: React.FC<Props> = (props) => {
  // console.debug("NonTradingForm レンダリング");

  const nav = useNavigate();

  // ------------------------------------------------------------
  // description
  const [open, setOpen] = useState<boolean>(false);
  const ref1 = useRef<HTMLDivElement>(null);

  let steps: TourProps["steps"] = [
    {
      title: `${props.language.component.NonTradingMain.title}`,
      description: `${props.language.component.NonTradingMain.description}`,
      target: () => ref1.current!,
    },
  ];

  useEffect(() => {
    const descriptionValue: number = props.descriptionValue;
    const descriptionValueDict: string = DescriptionValueDict.NONTRADING;

    if (descriptionValue.toString() === descriptionValueDict) {
      setOpen(true);
    }
  }, [props.descriptionValue]);

  const onClose = () => {
    setOpen(false);
    props.updateDescriptionValue(DescriptionValueDict.DEFAULT);
    nav(`${UrlPath.MAIN}`);
  };

  // ------------------------------------------------------------

  return (
    <>
      <Row>
        <Col span={24}>
          <Card>
            <div ref={ref1}>
              <NonTradingForm
                tradeInfo={props.tradeInfo}
                language={props.language}
                updateTradeInfo={props.updateTradeInfo}
                updateTradeListInfo={props.updateTradeListInfo}
                updateWalletInfo={props.updateWalletInfo}
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
