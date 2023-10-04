import { reducerWithInitialState } from "../node_modules/typescript-fsa-reducers";

import { TextInputActions } from "./reducer/TextInputActions";
import { UserActions } from "./reducer/UserActions";
import { ChartActions } from "./reducer/ChartActions";
import { StockActions } from "./reducer/StockActions";
import { TradeActions } from "./reducer/TradeActions";

import { UserInfo } from "./models/UserInfo";
import { ChartInfo } from "./models/ChartInfo";
// import { StockInfo } from "./models/StockInfo";
import { TradeInfo } from "./models/TradeInfo";

export interface State {
  inputValue: string;
  selectedValue: string;
  clickCount: number;

  // user
  userInfo: Array<UserInfo>[];

  // chart
  chartInfo: Array<ChartInfo>[];

  stockInfo: Array<String>[];

  tradeInfo: Array<TradeInfo>[];
}

export const initialState: State = {
  inputValue: "",
  selectedValue: "",
  clickCount: 0,

  // user
  userInfo: [],

  // chart
  chartInfo: [],

  // stock
  stockInfo: ["btc"],

  // trade
  tradeInfo: []
};

export const Reducer = reducerWithInitialState(initialState)
  .case(TextInputActions.updateTextInputValue, (state, inputValue) => {
    return { ...state, inputValue };
  })
  .case(TextInputActions.updateSelectedValue, (state, selectedValue) => {
    return { ...state, selectedValue };
  })
  .case(TextInputActions.updateClickCount, (state) => {
    return { ...state, clickCount: state.clickCount + 1 };
  })
  .case(UserActions.updateUserInfo, (state, newUserInfo) => {
    // console.log("state : " + JSON.stringify(state));
    // console.log("newUserInfo : " + JSON.stringify(newUserInfo));
    return { ...state, userInfo: newUserInfo };
  })
  .case(ChartActions.updateChartInfo, (state, newChartInfo) => {
    // console.log("state : " + JSON.stringify(state));
    // console.log("newChartInfo : " + JSON.stringify(newChartInfo));
    return {
      ...state,
      chartInfo: [...state.chartInfo.slice(-10, 11), newChartInfo]
    };
  })
  .case(StockActions.updateStockInfo, (state, newStockInfo) => {
    // console.log("state : " + JSON.stringify(state));
    // console.log("newStockInfo : " + JSON.stringify(newStockInfo));
    return { ...state, stockInfo: newStockInfo };
  })
  .case(TradeActions.updateTradeInfo, (state, newTradeInfo) => {
    // console.log("state : " + JSON.stringify(state));
    // console.log("newTradeInfo : " + JSON.stringify(newTradeInfo));
    return {
      ...state,
      tradeInfo: [
        ...state.tradeInfo.filter((val) => val.id !== newTradeInfo.id),
        newTradeInfo
      ]
    };
  });
