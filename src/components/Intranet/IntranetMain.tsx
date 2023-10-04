import React, { ReactNode } from "react";
import { Layout, theme } from "antd";
import { HeaderMain } from "./Header/HeaderMain";
import { HeaderImage } from "./Header/HeaderImage";
import { HeaderButton } from "./Header/HeaderButton";
import { FooterMain } from "./Footer/FooterMain";
import { ContentMain } from "./Content/ContentMain";

type Props = {
  children: ReactNode;
};

export const IntranetMain: React.FC<Props> = (props) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Layout className="site-layout">
        <HeaderMain colorBgContainer={colorBgContainer}>
          <HeaderImage />
          <HeaderButton />
        </HeaderMain>
        <ContentMain colorBgContainer={colorBgContainer}>
          {props.children}
        </ContentMain>
        <FooterMain />
      </Layout>
    </Layout>
  );
};
