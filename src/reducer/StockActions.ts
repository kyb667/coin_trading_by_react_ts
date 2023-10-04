import { actionCreatorFactory } from "typescript-fsa";
import { StockInfo } from "../models/StockInfo";

const actionCreator = actionCreatorFactory();

export const StockActions = {
  updateStockInfo: actionCreator<StockInfo>("ACTION_UPDATE_STOCK_INFO"),
};
