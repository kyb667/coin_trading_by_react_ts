import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// antd
import { Radio, Tabs, Row, Col, Card, Space, Input, Tour } from "antd";
import type { TourProps } from "antd";
import type { RadioChangeEvent } from "antd";
// components
import { WalletForm } from "./Wallet/Form/WalletForm";
import { MoneyForm } from "./Wallet/Form/MoneyForm";
import { PieChartForm } from "./Wallet/PieChart/PieChartForm";
import { ChargeMain } from "./Charge/ChargeMain";
import { WalletMain } from "./Wallet/WalletMain";
import { HistoryMain } from "./History/HistoryMain";
import { NonTradingMain } from "./NonTrading/NonTradingMain";
// models
import { Wallet } from "../../models/Wallet";
import { TradeInfoList } from "../../models/TradeInfo";
import { Language } from "../../models/Language";
import { UserInfoList } from "../../models/UserInfo";
import { DescriptionValue } from "../../models/ShowDescription";
// common
import { DescriptionValueDict, UrlPath } from "../../common";

type Props = {
  updateWalletInfo: Function;
  updateTradeInfo: Function;
  updateTradeListInfo: Function;
  updateDescriptionValue: Function;
} & Wallet &
  TradeInfoList &
  Language &
  UserInfoList &
  DescriptionValue;

export const Tab: React.FC<Props> = (props) => {
  const [defaultActiveKey, setDefaultActiveKeydfaultAciveKy] =
    useState<string>("charge");

  // ------------------------------------------------------------
  // description
  useEffect(() => {
    const descriptionValue: number = props.descriptionValue;

    switch (descriptionValue.toString()) {
      case DescriptionValueDict.MYINFO:
        setDefaultActiveKeydfaultAciveKy("charge");
        break;
      case DescriptionValueDict.WALLET:
        setDefaultActiveKeydfaultAciveKy("wallet");
        break;
      case DescriptionValueDict.HISTORY:
        setDefaultActiveKeydfaultAciveKy("history");
        break;
      case DescriptionValueDict.NONTRADING:
        setDefaultActiveKeydfaultAciveKy("NonTradingTab");
        break;
    }
  }, [props.descriptionValue]);

  // ------------------------------------------------------------
  // tab setting

  const TabList = [
    {
      label: `${props.language.component.Tab.ChargeTab.label}`,
      key: `charge`,
      disabled: false,
      children: (
        <ChargeMain
          updateWalletInfo={props.updateWalletInfo}
          wallet={props.wallet}
          language={props.language}
          descriptionValue={props.descriptionValue}
          updateDescriptionValue={props.updateDescriptionValue}
        />
      ),
    },
    {
      label: `${props.language.component.Tab.WalletTab.label}`,
      key: `wallet`,
      disabled: false,
      children: (
        <WalletMain
          tradeInfo={props.tradeInfo}
          wallet={props.wallet}
          language={props.language}
          descriptionValue={props.descriptionValue}
          updateDescriptionValue={props.updateDescriptionValue}
        />
      ),
    },
    {
      label: `${props.language.component.Tab.HistoryTab.label}`,
      key: "history",
      disabled: false,
      children: (
        <HistoryMain
          tradeInfo={props.tradeInfo}
          language={props.language}
          descriptionValue={props.descriptionValue}
          updateDescriptionValue={props.updateDescriptionValue}
        />
      ),
    },
    {
      label: `${props.language.component.Tab.NonTradingTab.label}`,
      key: "NonTradingTab",
      disabled: false,
      children: (
        <NonTradingMain
          tradeInfo={props.tradeInfo}
          language={props.language}
          updateTradeInfo={props.updateTradeInfo}
          updateTradeListInfo={props.updateTradeListInfo}
          descriptionValue={props.descriptionValue}
          updateDescriptionValue={props.updateDescriptionValue}
          updateWalletInfo={props.updateWalletInfo}
        />
      ),
    },
  ];

  const changeTab = (activeKey: string) => {
    setDefaultActiveKeydfaultAciveKy(activeKey);
  };

  // ------------------------------------------------------------

  return (
    <div>
      <Tabs
        activeKey={defaultActiveKey}
        onChange={changeTab}
        tabPosition={"top"}
        items={TabList.map((val, i) => val)}
      />
    </div>
  );
};
