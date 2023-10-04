import { EllipsisOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import type { TourProps } from "antd";
import { Button, Divider, Space, Tour } from "antd";
import { useNavigate } from "react-router-dom";

export const HeaderButton: React.FC = () => {
  const nav = useNavigate();

  const ref1 = useRef<HTMLButtonElement>(null);
  const ref2 = useRef<HTMLButtonElement>(null);
  const ref3 = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps["steps"] = [
    {
      title: "Upload File",
      description: "Put your files here.",
      target: () => ref1.current!
    },
    {
      title: "Save",
      description: "Save your changes.",
      target: () => ref2.current!
    },
    {
      title: "Other Actions",
      description: "Click to see other actions.",
      target: () => ref3.current!
    }
  ];

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Begin Tour
      </Button>
      {/* <Divider /> */}
      <Space>
        <Button ref={ref1} type="link" onClick={() => nav("/")}>
          Home
        </Button>
        <Button ref={ref2} type="link" onClick={() => nav("/myStock")}>
          My Stock
        </Button>
        <Button ref={ref3} type="link" onClick={() => nav("/myStock2")}>
          ...
        </Button>
      </Space>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
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
