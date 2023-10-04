import { actionCreatorFactory } from "typescript-fsa";
import { TradeInfo } from "../models/TradeInfo";

const actionCreator = actionCreatorFactory();

export const TradeActions = {
  updateTradeInfo: actionCreator<TradeInfo>("ACTION_UPDATE_TRADE_INFO"),
};
