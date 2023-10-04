import { actionCreatorFactory } from "typescript-fsa";
import { TradeInfo, TradeInfoList } from "../models/TradeInfo";

const actionCreator = actionCreatorFactory();

export const TradeActions = {
  updateTradeInfo: actionCreator<TradeInfo>("ACTION_UPDATE_TRADE_INFO"),
  updateTradeListInfo: actionCreator<TradeInfo[]>(
    "ACTION_UPDATE_TRADE_LIST_INFO",
  ),
};
