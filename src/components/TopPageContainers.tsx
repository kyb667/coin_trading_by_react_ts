import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Main } from "./Main";
import { StockActions } from "../reducer/StockActions";

import { UserActions } from "../reducer/UserActions";
import { ChartActions } from "../reducer/ChartActions";

import { AppState } from "../store";
import { ChartInfo } from "../models/ChartInfo";
import { UserInfo } from "../models/UserInfo";
import { StockInfo } from "../models/StockInfo";

import { TradeInfo } from "../models/TradeInfo";
import { TradeActions } from "../reducer/TradeActions";

const mapStateToProps = (appState: AppState) => {
  return {
    // inputValue: appState.state.inputValue,
    // selectedValue: appState.state.selectedValue,
    // clickCount: appState.state.clickCount,
    userInfo: appState.state.userInfo,
    chartInfo: appState.state.chartInfo,
    stockInfo: appState.state.stockInfo,
    tradeInfo: appState.state.tradeInfo
  };
};

export interface TopPageHandler {
  // handleOnChangeValue(value: string): void;
  // handleOnSelectValue(value: string): void;
  handleOnClick(value: Array<UserInfo>): void;
  updateChartInfo(value: Array<ChartInfo>): void;
  updateStockInfo(value: StockInfo): void;
  updateTradeInfo(value: TradeInfo): void;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    // handleOnChangeValue: (value: string) => {
    //   dispatch(TextInputActions.updateTextInputValue(value));
    // },
    // handleOnSelectValue: (value: string) => {
    //   dispatch(TextInputActions.updateSelectedValue(value));
    // },
    handleOnClick: (value: Array<UserInfo>) => {
      dispatch(UserActions.updateUserInfo(value));
    },
    updateChartInfo: (value: Array<ChartInfo>) => {
      dispatch(ChartActions.updateChartInfo(value));
    },
    updateStockInfo: (value: StockInfo) => {
      dispatch(StockActions.updateStockInfo(value));
    },
    updateTradeInfo: (value: TradeInfo) => {
      dispatch(TradeActions.updateTradeInfo(value));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
