import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Main } from "./Main";

import { ShowDescriptionActions } from "../reducer/ShowDescriptionActions";
import { StockActions } from "../reducer/StockActions";
import { UserActions } from "../reducer/UserActions";
import { ChartActions } from "../reducer/ChartActions";
import { WalletActions } from "../reducer/WalletActions";
import { TradeActions } from "../reducer/TradeActions";
import { LanguageActions } from "../reducer/LanguageActions";

import { AppState } from "../store";
import { ChartInfo } from "../models/ChartInfo";
import { UserInfo } from "../models/UserInfo";
import { StockInfo } from "../models/StockInfo";
import { TradeInfo } from "../models/TradeInfo";
import { Language } from "../models/Language";
import { WalletStock } from "../models/Wallet";

const mapStateToProps = (appState: AppState) => {
  return {
    userInfo: appState.state.userInfo,
    chartInfo: appState.state.chartInfo,
    stockInfo: appState.state.stockInfo,
    tradeInfo: appState.state.tradeInfo,
    wallet: appState.state.wallet,
    walletStock: appState.state.walletStock,
    language: appState.state.language,
    descriptionValue: appState.state.descriptionValue,
  };
};

export interface TopPageHandler {
  updateUserInfo(value: UserInfo[]): void;
  updateChartInfo(value: ChartInfo): void;
  updateStockInfo(value: String[]): void;
  updateTradeInfo(value: TradeInfo): void;
  updateWalletInfo(value: number): void;
  updateWallet(value: number): void;
  updateWalletStockInfo(value: WalletStock): void;
  updateLanguage(value: Language): void;
  updateTradeListInfo(value: TradeInfo[]): void;
  updateDescriptionValue(value: string): void;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateUserInfo: (value: UserInfo[]) => {
      dispatch(UserActions.updateUserInfo(value));
    },
    updateChartInfo: (value: ChartInfo) => {
      dispatch(ChartActions.updateChartInfo(value));
    },
    updateStockInfo: (value: String[]) => {
      dispatch(StockActions.updateStockInfo(value));
    },
    updateTradeInfo: (value: TradeInfo) => {
      dispatch(TradeActions.updateTradeInfo(value));
    },
    updateTradeListInfo: (value: TradeInfo[]) => {
      dispatch(TradeActions.updateTradeListInfo(value));
    },
    updateWalletInfo: (value: number) => {
      dispatch(WalletActions.updateWalletInfo(value));
    },
    updateWallet: (value: number) => {
      dispatch(WalletActions.updateWallet(value));
    },
    updateWalletStockInfo: (value: WalletStock) => {
      dispatch(WalletActions.updateWalletStockInfo(value));
    },
    updateLanguage: (value: Language) => {
      dispatch(LanguageActions.updateLanguage(value));
    },
    updateDescriptionValue: (value: string) => {
      dispatch(ShowDescriptionActions.updateDescriptionValue(value));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
