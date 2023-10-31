import React, { ReactNode } from "react";
import { Layout, theme } from "antd";
// components
import { HeaderMain } from "./Header/HeaderMain";
import { HeaderImage } from "./Header/HeaderImage";
import { HeaderButton } from "./Header/HeaderButton";
import { FooterMain } from "./Footer/FooterMain";
import { ContentMain } from "./Content/ContentMain";
// models
import { Language } from "../../models/Language";
import { UserInfo, UserInfoList } from "../../models/UserInfo";
import { DescriptionValue } from "../../models/ShowDescription";

type Props = {
  children: ReactNode;
  updateLanguage: Function;
  updateUserInfo: Function;
  updateDescriptionValue: Function;
} & UserInfoList &
  Language &
  DescriptionValue;

export const IntranetMain: React.FC<Props> = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Layout className="site-layout">
        <HeaderMain colorBgContainer={colorBgContainer}>
          {/* <HeaderImage /> */}
          <HeaderButton
            updateLanguage={props.updateLanguage}
            updateUserInfo={props.updateUserInfo}
            language={props.language}
            userInfo={props.userInfo}
            descriptionValue={props.descriptionValue}
            updateDescriptionValue={props.updateDescriptionValue}
          />
        </HeaderMain>
        <ContentMain colorBgContainer={colorBgContainer}>
          {props.children}
        </ContentMain>
        <FooterMain />
      </Layout>
    </Layout>
  );
};
