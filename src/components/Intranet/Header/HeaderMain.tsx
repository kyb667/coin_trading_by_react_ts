import React, { ReactNode } from "react";
import { Layout } from "antd";

const { Header } = Layout;

type Props = {
  colorBgContainer: string;
  children: ReactNode;
};

export const HeaderMain: React.FC<Props> = (props) => {
  return (
    <Header style={{ padding: 0, background: props.colorBgContainer }}>
      {props.children}
    </Header>
  );
};
