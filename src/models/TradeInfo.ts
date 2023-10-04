type TradeInfo = {
  // 注文ID
  id: string;
  userId: string;
  // 注文ステータス（0 : 待機 、1: 成功）
  state: string;
  // 株式名
  tradeStock: string;
  // 取引タイプ（1 : 買い、2 : 売り、3：予約）
  tradeType: string;
  // 注文単価
  tradeMoney: string;
  // 注文時間
  createdAt: string;
  // 更新時間
  updatedAt: string;
};

interface TradeInfoList {
  tradeInfo: TradeInfo[];
}

export { TradeInfo, TradeInfoList };
