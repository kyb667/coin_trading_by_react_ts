import React, { useRef, useState, useEffect } from "react";
// antd
import { Row, Col, Card, Tour } from "antd";
import type { TourProps } from "antd";
// components
import { ChargeForm } from "./ChargeForm";
import { NowWallet } from "../Wallet/NowWallet";
// models
import { Wallet } from "../../../models/Wallet";
import { Language } from "../../../models/Language";
import { DescriptionValue } from "../../../models/ShowDescription";
// common
import { DescriptionValueDict, UrlPath } from "../../../common";

type Props = {
  updateWalletInfo: Function;
  updateDescriptionValue: Function;
} & Wallet &
  Language;

export const ChargeMain: React.FC<Props> = (props) => {
  // ------------------------------------------------------------
  // description
  const [open, setOpen] = useState<boolean>(false);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  let steps: TourProps["steps"] = [
    {
      title: `${props.language.component.Charge.NowWallet.title}`,
      description: `${props.language.component.Charge.NowWallet.description}`,
      target: () => ref1.current!,
    },
    {
      title: `${props.language.component.Charge.ChargeForm.title}`,
      description: `${props.language.component.Charge.ChargeForm.description}`,
      target: () => ref2.current!,
    },
  ];

  useEffect(() => {
    const descriptionValue: number = props.descriptionValue;
    const descriptionValueDict: string = DescriptionValueDict.MYINFO;

    if (descriptionValue.toString() === descriptionValueDict) {
      setOpen(true);
    }
  }, [props.descriptionValue]);

  const onClose = () => {
    setOpen(false);
    props.updateDescriptionValue(DescriptionValueDict.WALLET);
  };

  // ------------------------------------------------------------

  return (
    <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: 1000 }}>
      <Row>
        <Col span={24}>
          <Card>
            <div ref={ref1}>
              <NowWallet wallet={props.wallet} language={props.language} />
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card>
            <div ref={ref2}>
              <ChargeForm
                updateWalletInfo={props.updateWalletInfo}
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
    </div>
  );
};
