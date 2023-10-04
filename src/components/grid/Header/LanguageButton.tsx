import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, message, Space } from "antd";

import { LanguageType } from "../../../common";
import { Language } from "../../../models/Language";

type Props = {
  updateLanguage: Function;
  language: Language;
};

export const LanguageButton: React.FC<Props> = (props) => {
  const items: MenuProps["items"] = LanguageType;
  const onClick: MenuProps["onClick"] = ({ key }) => {
    props.updateLanguage(key);
  };

  return (
    <Dropdown menu={{ items, onClick }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {props.language.component.HeaderButton.Language.title}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};
