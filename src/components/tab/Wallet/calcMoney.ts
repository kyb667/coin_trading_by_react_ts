import { TradeInfo } from "../../../models/TradeInfo";

import { TradeState, TradeType } from "../../../common";

export const calcMoney = (tradeInfoList: TradeInfo[]) => {
  /**
   * データ構造
   * {
   *    btc : {
   *        key : string
   *        stockCnt: string
   *        allPrice : string
   *        successAveragePrice: string
   *        waiteAveragePrice : string
   *        description : string
   *    }
   * }
   *
   */
  let stockData: { [stockName: string]: { [dataName: string]: string } } = {};

  for (let i of tradeInfoList) {
    // データ初期化
    if (!(i.tradeStock in stockData)) {
      stockData[i.tradeStock] = {
        key: i.tradeStock,
        stockName: i.tradeStock,
        stockCnt: "0",
        waitStockCnt: "0",
        waiteAveragePrice: "0",
        successStockCnt: "0",
        successAveragePrice: "0",
        allPrice: "0",
        allAveragePrice: "0",
      };
    }

    let dump = { ...stockData };

    let updateData;

    switch (i.tradeType) {
      case TradeType.BUY:
        // すべての平均単価を求める
        let allPrice =
          parseInt(dump[i.tradeStock].allPrice) *
            parseInt(dump[i.tradeStock].stockCnt) +
          parseInt(i.tradeMoney);

        // 株式数の求める
        let stockCnt = parseInt(dump[i.tradeStock].stockCnt) + 1;

        let allAveragePrice = allPrice / stockCnt;

        switch (i.state) {
          case TradeState.WAIT:
            // 未締結注文の平均単価を求める
            let waiteAveragePrice =
              parseInt(dump[i.tradeStock].waiteAveragePrice) *
                parseInt(dump[i.tradeStock].waitStockCnt) +
              parseInt(i.tradeMoney);

            // 未締結注文の株式数を求める
            let waitStockCnt = parseInt(dump[i.tradeStock].waitStockCnt) + 1;

            updateData = {
              allPrice: allPrice.toString(),
              stockCnt: stockCnt.toString(),
              waiteAveragePrice: waiteAveragePrice.toString(),
              waitStockCnt: waitStockCnt.toString(),
              allAveragePrice: allAveragePrice.toString(),
            };
            break;
          case TradeState.SUCCESS:
            // 締結注文の平均単価を求める
            let successAveragePrice =
              parseInt(dump[i.tradeStock].successAveragePrice) *
                parseInt(dump[i.tradeStock].successStockCnt) +
              parseInt(i.tradeMoney);

            // 締結注文の株式数を求める
            let successStockCnt =
              parseInt(dump[i.tradeStock].successStockCnt) + 1;

            updateData = {
              allPrice: allPrice.toString(),
              stockCnt: stockCnt.toString(),
              successAveragePrice: successAveragePrice.toString(),
              successStockCnt: successStockCnt.toString(),
              allAveragePrice: allAveragePrice.toString(),
            };
            break;
        }

        break;
      case TradeType.SELL:
        if (i.state === TradeState.SUCCESS) {
          // 株式数がない？
          if (parseInt(dump[i.tradeStock].stockCnt) === 0) {
            break;
          } else {
            // 株式数を求める
            let stockCnt = parseInt(dump[i.tradeStock].stockCnt) - 1;
            // 株式が1個しかない
            if (parseInt(dump[i.tradeStock].stockCnt) === 1) {
              updateData = {
                allPrice: "0",
                stockCnt: stockCnt.toString(),
                waitStockCnt: "0",
                waiteAveragePrice: "0",
                successStockCnt: "0",
                successAveragePrice: "0",
                allAveragePrice: "0",
              };
            } else {
              updateData = {
                stockCnt: stockCnt.toString(),
              };
            }
          }
        }
        break;
    }

    if (updateData) {
      // console.debug(updateData);
      dump[i.tradeStock] = {
        ...dump[i.tradeStock],
        ...updateData,
      };
      // console.debug(dump);
      stockData = dump;
    }
  }

  return stockData;
};
