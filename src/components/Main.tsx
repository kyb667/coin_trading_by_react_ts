import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// components
import { UserForm } from "../components/user/UserForm";
import { Tab } from "../components/tab/Tab";
import { TopPageHandler } from "./TopPageContainers";
import { IntranetMain } from "./grid/IntranetMain";
import { StockMain } from "./mypage/stock/StockMain";
import { TradeGrid } from "./trade/TradeGrid";
import { ChartMain } from "./chart/ChartMain";
import { AutoData } from "./chart/AutoData";
import { Signin } from "./user/signin/Signin";
import { ForgotPassword } from "./user/forgotPassword/ForgotPassword";
// models
import { UserInfo, UserInfoList } from "../models/UserInfo";
import { ChartInfo, ChartInfoList } from "../models/ChartInfo";
import { StockInfo } from "../models/StockInfo";
import { TradeInfo, TradeInfoList } from "../models/TradeInfo";
import { Language } from "../models/Language";
import { Wallet, WalletStockList, WalletStock } from "../models/Wallet";
import { DescriptionValue } from "../models/ShowDescription";
// common
import {
  TradeState,
  TradeType,
  StockEnum,
  Stock,
  DbName,
  DescriptionValueDict,
} from "../common";
import { getDate } from "./chart/AutoData";
// language
import { JA } from "../ja";
import { ENG } from "../eng";
// db
import { getData, updateData } from "../axios/crud";

interface Props
  extends UserInfoList,
    ChartInfoList,
    StockInfo,
    TradeInfoList,
    TopPageHandler,
    Wallet,
    WalletStockList,
    Language,
    DescriptionValue {}

export const Main: React.FC<Props> = (props) => {
  // console.info(props);

  // 最初レンダリングのイベント
  useEffect(() => {
    // console.debug("Main レンダリング");
    AutoData(props);
  }, []);

  // 言語選択ボタンのクリックイベント
  const UpdateLanguage = (val: string) => {
    // console.debug("Main-UpdateLanguage start");
    switch (val) {
      case "JA":
        props.updateLanguage(JA);
        break;
      case "ENG":
        props.updateLanguage(ENG);
        break;
    }
    // console.debug("Main-UpdateLanguage start");
  };

  // ログイン後のデータ初期化
  const userDataSet = async (userData: any) => {
    // console.debug("Main-userDataSet start");

    const stockData = await getData(
      DbName.STOCK_DB,
      "userId",
      userData[0].userId,
    );

    const walletData = await getData(
      DbName.WALLET_DB,
      "userId",
      userData[0].userId,
    );

    const tradeData = await getData(
      DbName.TRADE_DB,
      "userId",
      userData[0].userId,
    );

    // [1] 会員ログイン
    props.updateUserInfo(userData);

    // [2] userの有効株式設定
    props.updateStockInfo(stockData[0].stock);
    // [3] userのwallet設定
    props.updateWallet(walletData[0].wallet);
    // [4] userの注文履歴設定
    props.updateTradeListInfo(tradeData);
    // [5] userの取引状況設定
    // await makeStockInfo(tradeData);

    props.updateDescriptionValue(DescriptionValueDict.HEADER);

    // console.debug("Main-userDataSet end");
  };

  useEffect(() => {
    makeStockInfo(props.tradeInfo);
    checkContract();
  }, [props.tradeInfo]);

  // 注文可能株式チェック
  const makeStockInfo = (tradeInfo: any[]) => {
    // console.debug("Main-makeStockInfo 開始");
    // console.debug(tradeInfo);

    /**
     *  {
     *    stockName : {
     *      buy : {
     *        wait : number,
     *        success : number
     *      },
     *      sell : {
     *        wait : number
     *        success : number
     *      },
     *      wait : {
     *        wait : number
     *        success : number
     *      }
     *    }
     *  }
     *
     */
    let stockData: WalletStock = {};

    for (let stockName of Stock) {
      const tradeStock = StockEnum[`${stockName}` as keyof typeof StockEnum];

      stockData[tradeStock] = {
        [TradeType.BUY]: {
          [TradeState.SUCCESS]: 0,
        },
        [TradeType.SELL]: {
          [TradeState.WAIT]: 0,
        },
      };
    }

    for (let trade of tradeInfo) {
      // console.debug("trade : ", trade);
      const tradeStock =
        StockEnum[`${trade.tradeStock}` as keyof typeof StockEnum];

      switch (trade.state) {
        case TradeState.WAIT:
          if (trade.tradeType === TradeType.SELL) {
            stockData[tradeStock]![TradeType.SELL]![TradeState.WAIT]! += 1;
          }
          break;
        case TradeState.SUCCESS:
          if (trade.tradeType === TradeType.BUY) {
            stockData[tradeStock]![TradeType.BUY]![TradeState.SUCCESS]! += 1;
          }
          if (trade.tradeType === TradeType.SELL) {
            stockData[tradeStock]![TradeType.BUY]![TradeState.SUCCESS]! -= 1;
            if (
              stockData[tradeStock]![TradeType.BUY]![TradeState.SUCCESS]! < 0
            ) {
              stockData[tradeStock]![TradeType.BUY]![TradeState.SUCCESS]! = 0;
            }
          }
          break;
      }
    }

    props.updateWalletStockInfo(stockData);

    // console.debug("Main-makeStockInfo 終了");
  };

  // 注文が締結されたのかチェック
  const checkContract = () => {
    if (props.tradeInfo.length > 0) {
      for (let i of props.tradeInfo) {
        // 待機の注文のにチェック
        if (i.state === TradeState.WAIT) {
          if (i.tradeType === TradeType.BUY) {
            if (
              parseInt(props.chartInfo[10][i.tradeStock]) <=
              parseInt(i.tradeMoney)
            ) {
              let d = { ...i, state: TradeState.SUCCESS };
              props.updateTradeInfo(d);

              updateData(DbName.TRADE_DB, i.id, {
                state: TradeState.SUCCESS,
                updatedAt: getDate(new Date()),
              });
            }
          } else if (i.tradeType === TradeType.SELL) {
            if (
              parseInt(props.chartInfo[10][i.tradeStock]) >=
              parseInt(i.tradeMoney)
            ) {
              let d = { ...i, state: TradeState.SUCCESS };
              props.updateTradeInfo(d);
              props.updateWalletInfo(parseInt(i.tradeMoney));

              updateData(DbName.TRADE_DB, i.id, {
                state: TradeState.SUCCESS,
                updatedAt: getDate(new Date()),
              });
            } else {
            }
          }
        } else {
          if (i.tradeType === TradeType.BUY) {
          }
        }
      }
    }
  };

  // チャートデータが変わった場合、トリガーされる
  useEffect(() => {
    // console.debug("Main-useEffect-chartInfo 開始");
    checkContract();
    // console.debug("Main-useEffect-chartInfo 終了");
  }, [props.chartInfo]);

  // お金の状況が変わった場合、トリガーされる
  useEffect(() => {
    // console.debug("Main-useEffect-wallet 開始");

    const _data = async () => {
      // console.debug("Main-useEffect-wallet_data 開始");
      const isExist = await getData(
        DbName.WALLET_DB,
        "userId",
        props.userInfo[0].userId,
      );

      const walletData = await updateData(DbName.WALLET_DB, isExist[0].id, {
        wallet: props.wallet,
      });
      // console.debug("Main-useEffect-wallet_data 終了");
    };

    if (props.userInfo.length > 0) {
      _data();
    }
    // console.debug("Main-useEffect-wallet 終了");
  }, [props.wallet]);

  return (
    <IntranetMain
      updateLanguage={UpdateLanguage}
      language={props.language}
      userInfo={props.userInfo}
      updateUserInfo={props.updateUserInfo}
      descriptionValue={props.descriptionValue}
      updateDescriptionValue={props.updateDescriptionValue}
    >
      <Routes>
        <>
          <Route
            path="/"
            element={
              props.userInfo.length > 0 ? (
                <>
                  <ChartMain
                    chartInfo={props.chartInfo}
                    stockInfo={props.stockInfo}
                    language={props.language}
                    descriptionValue={props.descriptionValue}
                    updateDescriptionValue={props.updateDescriptionValue}
                  />
                  <br />
                  <TradeGrid
                    stockInfo={props.stockInfo}
                    tradeInfo={props.tradeInfo}
                    chartInfo={props.chartInfo}
                    updateTradeInfo={props.updateTradeInfo}
                    updateTradeListInfo={props.updateTradeListInfo}
                    updateWalletInfo={props.updateWalletInfo}
                    updateWalletStockInfo={props.updateWalletStockInfo}
                    language={props.language}
                    wallet={props.wallet}
                    userInfo={props.userInfo}
                    walletStock={props.walletStock}
                    descriptionValue={props.descriptionValue}
                    updateDescriptionValue={props.updateDescriptionValue}
                  />
                </>
              ) : (
                <UserForm onClickFunc={userDataSet} language={props.language} />
              )
            }
          />
          {props.userInfo.length > 0 ? (
            <>
              <Route
                path="/myStock"
                element={
                  <StockMain
                    userInfo={props.userInfo}
                    updateStockInfo={props.updateStockInfo}
                    language={props.language}
                    descriptionValue={props.descriptionValue}
                    updateDescriptionValue={props.updateDescriptionValue}
                  />
                }
              />
              <Route
                path="/myInfo"
                element={
                  <Tab
                    updateWalletInfo={props.updateWalletInfo}
                    wallet={props.wallet}
                    tradeInfo={props.tradeInfo}
                    userInfo={props.userInfo}
                    language={props.language}
                    updateTradeInfo={props.updateTradeInfo}
                    updateTradeListInfo={props.updateTradeListInfo}
                    descriptionValue={props.descriptionValue}
                    updateDescriptionValue={props.updateDescriptionValue}
                  />
                }
              />
            </>
          ) : (
            <>
              <Route
                path="/signin"
                element={
                  <Signin
                    updateUserInfo={userDataSet}
                    language={props.language}
                  />
                }
              />
              <Route
                path="/forgotPassword"
                element={<ForgotPassword language={props.language} />}
              />
            </>
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      </Routes>
    </IntranetMain>
  );
};
