import { reducerWithInitialState } from "typescript-fsa-reducers";

import { ShowDescriptionActions } from "./reducer/ShowDescriptionActions";
import { UserActions } from "./reducer/UserActions";
import { ChartActions } from "./reducer/ChartActions";
import { StockActions } from "./reducer/StockActions";
import { TradeActions } from "./reducer/TradeActions";
import { WalletActions } from "./reducer/WalletActions";
import { LanguageActions } from "./reducer/LanguageActions";

import { UserInfo, UserInfoList } from "./models/UserInfo";
import { ChartInfo, ChartInfoList } from "./models/ChartInfo";
import { TradeInfo, TradeInfoList } from "./models/TradeInfo";
import { StockInfo } from "./models/StockInfo";
import { Wallet, WalletStock, WalletStockList } from "./models/Wallet";
import { Language } from "./models/Language";

import { JA } from "./ja";

import { DescriptionValueDict } from "./common";

export type State = UserInfoList &
  ChartInfoList &
  TradeInfoList &
  StockInfo &
  Wallet &
  WalletStockList &
  Language;

export const initialState: State = {
  // user
  userInfo: [],

  // chart
  chartInfo: [],

  // stock
  stockInfo: ["btc"],

  // trade
  tradeInfo: [],

  // Wallet
  wallet: 0,

  walletStock: {},

  language: JA,

  descriptionValue: DescriptionValueDict.DEFAULT,
};

export const Reducer = reducerWithInitialState(initialState)
  .case(UserActions.updateUserInfo, (state: State, newUserInfo: UserInfo[]) => {
    // console.debug("state : " + JSON.stringify(state));
    // console.debug("newUserInfo : " + JSON.stringify(newUserInfo));
    return { ...state, userInfo: newUserInfo };
  })
  .case(
    ChartActions.updateChartInfo,
    (state: State, newChartInfo: ChartInfo) => {
      // console.debug("state : " + JSON.stringify(state));
      // console.debug("newChartInfo : " + JSON.stringify(newChartInfo));
      return {
        ...state,
        chartInfo: [...state.chartInfo.slice(-10, 11), newChartInfo],
      };
    },
  )
  .case(
    StockActions.updateStockInfo,
    (state: State, newStockInfo: String[]) => {
      // console.debug("state : " + JSON.stringify(state));
      // console.debug("newStockInfo : " + JSON.stringify(newStockInfo));
      return { ...state, stockInfo: newStockInfo };
    },
  )
  .case(
    TradeActions.updateTradeInfo,
    (state: State, newTradeInfo: TradeInfo) => {
      // console.debug("state : " + JSON.stringify(state));
      // console.debug("newTradeInfo : " + JSON.stringify(newTradeInfo));
      return {
        ...state,
        tradeInfo: [
          ...state.tradeInfo.filter((val) => val.id !== newTradeInfo.id),
          newTradeInfo,
        ],
      };
    },
  )
  .case(
    TradeActions.updateTradeListInfo,
    (state: State, newTradeInfo: TradeInfo[]) => {
      // console.debug("state : " + JSON.stringify(state));
      // console.debug("newTradeInfo : " + JSON.stringify(newTradeInfo));
      return {
        ...state,
        tradeInfo: newTradeInfo,
      };
    },
  )
  .case(WalletActions.updateWalletInfo, (state: State, value: number) => {
    // console.debug("state : " + JSON.stringify(state));
    // console.debug("value : " + JSON.stringify(value));
    return { ...state, wallet: state.wallet + value };
  })
  .case(WalletActions.updateWallet, (state: State, value: number) => {
    // console.debug("state : " + JSON.stringify(state));
    // console.debug("value : " + JSON.stringify(value));
    return { ...state, wallet: value };
  })
  .case(
    WalletActions.updateWalletStockInfo,
    (state: State, walletStock: WalletStock) => {
      // console.debug("state : " + JSON.stringify(state.walletStock));
      // console.debug("walletStock : " + JSON.stringify(walletStock));
      return {
        ...state,
        walletStock: walletStock,
      };
    },
  )
  .case(
    LanguageActions.updateLanguage,
    (state: State, newLanguage: Language) => {
      // console.debug("state : " + JSON.stringify(state));
      // console.debug("newLanguage : " + JSON.stringify(newLanguage));
      return { ...state, language: newLanguage };
    },
  )
  .case(
    ShowDescriptionActions.updateDescriptionValue,
    (state: State, value: string) => {
      // console.debug("state : " + JSON.stringify(state));
      // console.debug("value : " + JSON.stringify(value));
      return { ...state, descriptionValue: value };
    },
  );
