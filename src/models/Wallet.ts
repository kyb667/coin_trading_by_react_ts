import { StockEnum, TradeState, TradeType } from "../common";

type Wallet = {
  wallet: number;
};

type WalletIdAtom = {
  [state in TradeState]?: number;
};

type WalletTypeAtom = {
  [tradeType in TradeType]?: WalletIdAtom;
};

type WalletStock = {
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
  [name in StockEnum]?: WalletTypeAtom;
};

interface WalletStockList {
  walletStock: WalletStock;
}

export { Wallet, WalletStock, WalletStockList, WalletTypeAtom, WalletIdAtom };
