import { EllipsisOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import type { TourProps } from "antd";
import { Button, Divider, Space, Tour } from "antd";
import { useNavigate } from "react-router-dom";
// components
import { LanguageButton } from "./LanguageButton";
// models
import { Language } from "../../../models/Language";
import { UserInfo, UserInfoList } from "../../../models/UserInfo";
import { DescriptionValue } from "../../../models/ShowDescription";
// common
import { UrlPath, DescriptionValueDict } from "../../../common";

type Props = {
  updateLanguage: Function;
  updateUserInfo: Function;
  updateDescriptionValue: Function;
} & UserInfoList &
  Language &
  DescriptionValue;

export const HeaderButton: React.FC<Props> = (props) => {
  // console.debug("HeaderButton レンダリング");
  const nav = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const descriptionValue: number = props.descriptionValue;
    const descriptionValueDict: string = DescriptionValueDict.HEADER;

    if (descriptionValue.toString() === descriptionValueDict) {
      setOpen(true);
    }
  }, [props.descriptionValue]);

  const ref0 = useRef<HTMLButtonElement>(null);
  const ref1 = useRef<HTMLButtonElement>(null);
  const ref2 = useRef<HTMLButtonElement>(null);
  const ref3 = useRef<HTMLButtonElement>(null);
  const ref4 = useRef<HTMLButtonElement>(null);
  const ref5 = useRef<HTMLButtonElement>(null);

  let steps: TourProps["steps"] = [];

  if (props.userInfo.length > 0) {
    steps = [
      {
        title: `${props.language.component.HeaderButton.Main.title}`,
        description: `${props.language.component.HeaderButton.Main.description}`,
        target: () => ref0.current!,
      },
      {
        title: `${props.language.component.HeaderButton.HomeBtn.title}`,
        description: `${props.language.component.HeaderButton.HomeBtn.description}`,
        target: () => ref1.current!,
      },
      {
        title: `${props.language.component.HeaderButton.StockBtn.title}`,
        description: `${props.language.component.HeaderButton.StockBtn.description}`,
        target: () => ref2.current!,
      },
      {
        title: `${props.language.component.HeaderButton.InfoBtn.title}`,
        description: `${props.language.component.HeaderButton.InfoBtn.description}`,
        target: () => ref3.current!,
      },
      {
        title: `${props.language.component.HeaderButton.Language.title}`,
        description: `${props.language.component.HeaderButton.Language.description}`,
        target: () => ref4.current!,
      },
      {
        title: `${props.language.component.HeaderButton.LogoutBtn.title}`,
        description: `${props.language.component.HeaderButton.LogoutBtn.description}`,
        target: () => ref5.current!,
      },
    ];
  } else {
    steps = [
      {
        title: `${props.language.component.HeaderButton.HomeBtn.title}`,
        description: `${props.language.component.HeaderButton.HomeBtn.description}`,
        target: () => ref1.current!,
      },
      {
        title: `${props.language.component.HeaderButton.Language.title}`,
        description: `${props.language.component.HeaderButton.Language.description}`,
        target: () => ref4.current!,
      },
    ];
  }

  const logout = () => {
    props.updateUserInfo([]);
    nav(`${UrlPath.MAIN}`);
  };

  const onClose = () => {
    setOpen(false);
    props.updateDescriptionValue(DescriptionValueDict.CHART);
  };

  return (
    <>
      {/* <Divider /> */}
      <Space>
        <Button ref={ref1} type="link" onClick={() => nav(`${UrlPath.MAIN}`)}>
          {props.language.component.HeaderButton.HomeBtn.title}
        </Button>
        {props.userInfo.length > 0 ? (
          <Button
            ref={ref2}
            type="link"
            onClick={() => nav(`${UrlPath.STOCK}`)}
          >
            {props.language.component.HeaderButton.StockBtn.title}
          </Button>
        ) : null}
        {props.userInfo.length > 0 ? (
          <Button
            ref={ref3}
            type="link"
            onClick={() => nav(`${UrlPath.MYINFO}`)}
          >
            {props.language.component.HeaderButton.InfoBtn.title}
          </Button>
        ) : null}
        <Button ref={ref4} type="link">
          <LanguageButton
            updateLanguage={props.updateLanguage}
            language={props.language}
          />
        </Button>
        <Button
          type="link"
          onClick={() => {
            nav(`${UrlPath.MAIN}`);
            setOpen(true);
          }}
        >
          {props.language.component.HeaderButton.InfomationBtn.title}
        </Button>
        {props.userInfo.length > 0 ? (
          <Button ref={ref5} type="link" onClick={logout}>
            {props.language.component.HeaderButton.LogoutBtn.title}
          </Button>
        ) : null}
      </Space>
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
