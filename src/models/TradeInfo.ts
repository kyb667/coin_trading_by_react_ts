type TradeInfo = {
  // 注文ID
  id: string;
  // 注文ステータス
  // 0 : 待機 、1: 成功
  state: string;

  tradeStock: string;

  // 1 : 買い、2 : 売り、3：予約
  tradeType: string;

  // 注文単価
  tradeMoney: number;

  message: string;
};

let TradeInfoList: Array<TradeInfo>[];

export { TradeInfo, TradeInfoList };
