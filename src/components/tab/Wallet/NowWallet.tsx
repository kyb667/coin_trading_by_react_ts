// antd
import { Space, Input } from "antd";

// models
import { Wallet } from "../../../models/Wallet";
import { Language } from "../../../models/Language";

type Props = Wallet & Language;

export const NowWallet: React.FC<Props> = (props) => {
  return (
    <Space.Compact>
      <Input
        placeholder="Borderless"
        bordered={false}
        value={props.language.component.ChargeForm.success.description}
      />
      <Input prefix="￥" value={props.wallet} disabled />
    </Space.Compact>
  );
};
