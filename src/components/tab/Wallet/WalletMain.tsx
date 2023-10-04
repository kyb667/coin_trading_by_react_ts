import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// antd
import { Row, Col, Card, Tour } from "antd";
import type { TourProps } from "antd";
// components
import { WalletForm } from "./Form/WalletForm";
import { MoneyForm } from "./Form/MoneyForm";
import { PieChartForm } from "./PieChart/PieChartForm";
import { NowWallet } from "./NowWallet";
// models
import { Wallet } from "../../../models/Wallet";
import { TradeInfoList } from "../../../models/TradeInfo";
import { Language } from "../../../models/Language";
import { DescriptionValue } from "../../../models/ShowDescription";
// common
import { DescriptionValueDict, UrlPath } from "../../../common";

type Props = { updateDescriptionValue: Function } & Wallet &
  TradeInfoList &
  Language &
  DescriptionValue;

export const WalletMain: React.FC<Props> = (props) => {
  // ------------------------------------------------------------
  // description
  const [open, setOpen] = useState<boolean>(false);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);

  let steps: TourProps["steps"] = [
    {
      title: `${props.language.component.WalletMain.PieChartForm.title}`,
      description: `${props.language.component.WalletMain.PieChartForm.description}`,
      target: () => ref1.current!,
    },
    {
      title: `${props.language.component.WalletMain.NowWallet.title}`,
      description: `${props.language.component.WalletMain.NowWallet.description}`,
      target: () => ref2.current!,
    },
    {
      title: `${props.language.component.WalletMain.WalletForm.title}`,
      description: `${props.language.component.WalletMain.WalletForm.description}`,
      target: () => ref3.current!,
    },
    {
      title: `${props.language.component.WalletMain.MoneyForm.title}`,
      description: `${props.language.component.WalletMain.MoneyForm.description}`,
      target: () => ref4.current!,
    },
  ];

  useEffect(() => {
    const descriptionValue: number = props.descriptionValue;
    const descriptionValueDict: string = DescriptionValueDict.WALLET;

    if (descriptionValue.toString() === descriptionValueDict) {
      setOpen(true);
    }
  }, [props.descriptionValue]);

  const onClose = () => {
    setOpen(false);
    props.updateDescriptionValue(DescriptionValueDict.HISTORY);
  };

  // ------------------------------------------------------------

  return (
    <>
      <Row>
        <Col span={12}>
          <Card>
            <div ref={ref1}>
              <PieChartForm wallet={props.wallet} tradeInfo={props.tradeInfo} />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div ref={ref2}>
              <NowWallet wallet={props.wallet} language={props.language} />
            </div>
          </Card>
          <Card>
            <div ref={ref3}>
              <WalletForm
                tradeInfo={props.tradeInfo}
                language={props.language}
              />
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card>
            <div ref={ref4}>
              <MoneyForm
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
