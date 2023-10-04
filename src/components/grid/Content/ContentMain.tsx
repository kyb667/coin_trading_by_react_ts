import React from "react";
import { ReactNode } from "react";
import { Layout } from "antd";
const { Content } = Layout;

type Props = {
  colorBgContainer: string;
  children: ReactNode;
};

export const ContentMain: React.FC<Props> = (props) => {
  return (
    <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
      <div
        style={{
          padding: 24,
          textAlign: "center",
          background: props.colorBgContainer
        }}
      >
        {props.children}
      </div>
    </Content>
  );
};
