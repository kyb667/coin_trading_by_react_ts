export enum StockEnum {
  btc = "btc",
  etc = "etc",
  eth = "eth",
  xrp = "xrp",
  sol = "sol",
}
export const Stock = Object.values(StockEnum);

export enum TradeState {
  WAIT = "0",
  SUCCESS = "1",
  CANCEL = "2",
}

const TradeStateFilters: any = {};
Object.entries(TradeState).forEach(([key, value]) => {
  TradeStateFilters[value] = key;
});

export const TradeStateDict = TradeStateFilters;

export enum TradeType {
  BUY = "1",
  SELL = "2",
  RESERVATION = "3",
}

const tradeTypeFilters: any = {};
Object.entries(TradeType).forEach(([key, value]) => {
  tradeTypeFilters[value] = key;
});

export const TradeTypeDict = tradeTypeFilters;

export const LanguageType = [
  {
    label: "JA",
    key: "JA",
  },
  {
    label: "ENG",
    key: "ENG",
  },
];

export const StateCode = {
  SUCCESS: 200,
  ERROR: 500,
};

export const UrlPath = {
  MAIN: "/",
  STOCK: "/myStock",
  MYINFO: "/myInfo",
};

export const DbName = {
  USER_DB: "user",
  STOCK_DB: "stock",
  WALLET_DB: "wallet",
  TRADE_DB: "trade",
};

export const DescriptionValueDict = {
  DEFAULT: "0",
  HEADER: "1",
  CHART: "2",
  TRADEGRID: "3",
  SELECTSTOCK: "4",
  MYINFO: "5",
  WALLET: "6",
  HISTORY: "7",
  NONTRADING: "8",
};
