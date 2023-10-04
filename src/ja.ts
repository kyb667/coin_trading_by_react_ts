export const JA = {
  component: {
    UserForm: {
      title: {
        label: "ようこそ！",
      },
      userId: {
        label: "ユーザー名",
        rules: "ユーザー名を入力してください",
      },
      password: {
        label: "パスワード",
        rules: "パスワードを入力してください",
      },
      ForgotPassword: {
        label: "パスワード再設定",
      },
      RegisterNow: {
        label: "会員登録",
      },
      loginBtn: {
        label: "ログイン",
      },
      alert: "入力した値を確認してください",
    },
    SignIn: {
      userId: {
        label: "ユーザーID",
        rules: "ユーザーIDを入力してください",
      },
      username: {
        label: "ユーザー名",
        rules: "ユーザー名を入力してください",
      },
      password: {
        label: "パスワード",
        rules: "パスワードを入力してください",
      },
      loginBtn: {
        label: "会員登録",
      },
      alert: "既に存在するuserIdです。",
    },
    TradeMain: {
      title: { label: "取引" },
      stock: {
        label: "株式",
        rules: "株式を選択してください",
      },
      money: {
        label: "注文金額",
        rules: "注文金額を入力してください",
      },
      buyBtn: {
        label: "買い",
      },
      sellBtn: {
        label: "売り",
      },
      reservationBtn: {
        label: "予約",
      },
      notFoundStockAlert: "購買した株式がありません。",
      noMoneyAlert: "金額不足です。",
    },
    HeaderButton: {
      Main: {
        title: "ようこそ！",
        description: "仮想通貨取引サービスについてご説明いたします",
      },
      HomeBtn: {
        title: "ホーム",
        description: "ホーム画面ボタン",
      },
      StockBtn: {
        title: "株式選択",
        description: "株式選択することができます",
      },
      InfoBtn: {
        title: "注文状況ページ",
        description: "現在の状況を確認することができます",
      },
      Language: {
        title: "言語選択",
        description: "言語を選択するのができます",
      },
      InfomationBtn: {
        title: "ページ情報を見る",
      },
      LogoutBtn: {
        title: "ログアウト",
        description: "ボタンを押すとログアウトされます",
      },
    },
    TradeTimeline: {
      title: { label: "タイムライン" },
    },
    StockMain: {
      stockName: { label: "株式名" },
      Description: { label: "説明" },
      button: { label: "保存" },
      title: "株式選択機能",
      description: "取引を希望する株式が選べます",
    },
    ChargeForm: {
      money: { label: "チャージ金額", rules: "値を入力してください" },
      remember: {
        message: "利用規則に同意します。",
        rules: "利用規則に同意してください",
      },
      button: { label: "チャージ" },
      resetButton: { label: "すべて消す" },
      success: { message: "チャージ成功", description: "総金額" },
    },
    Tab: {
      ChargeTab: { label: "チャージ" },
      WalletTab: { label: "ウォレット" },
      HistoryTab: { label: "注文履歴" },
      NonTradingTab: { label: "未締結注文" },
    },
    WalletForm: {
      StockName: { label: "株式名" },
      StockCnt: { label: "株式数" },
      AveragePrice: { label: "平均単価" },
    },
    MoneyForm: {
      StockName: { label: "株式名" },
      StockCnt: { label: "株式数" },
      waiteAveragePrice: { label: "未締結金額" },
      successAveragePrice: { label: "締結金額" },
      allAveragePrice: { label: "総金額" },
    },
    History: {
      StockName: { label: "株式名" },
      TradeMoney: { label: "注文金額" },
      TradeType: { label: "注文タイプ" },
      TradeState: { label: "締結" },
      CreatedAt: { label: "注文時刻" },
      UpdatedAt: { label: "更新時刻" },
    },
    ChartMain: {
      title: "グラフ",
      description: "1分ごとに株式のデータが追加され、株価を確認できます",
    },
    TradeGrid: {
      Trade: {
        title: "株価の推移",
        description: "株価の推移が表示されます",
      },
      TradeMain: {
        title: "注文機能",
        description:
          "注文したい株式と株価を入力し、ボタンを押すと注文ができます",
      },
      TradeTimeline: {
        title: "タイムライン",
        description: "注文履歴を確認することができます",
      },
    },
    Charge: {
      NowWallet: {
        title: "お金の保有状況",
        description: "お金の保有状況が確認できます",
      },
      ChargeForm: {
        title: "チャージ機能",
        description: "チャージ金額を入力してボタンを押すとチャージされます",
      },
    },
    WalletMain: {
      PieChartForm: {
        title: "円グラフ",
        description: "保有株式の割合が表示されます",
      },
      NowWallet: {
        title: "お金の保有状況",
        description: "お金の保有状況が確認できます",
      },
      WalletForm: {
        title: "平均単価",
        description: "株式別に平均単価が表示されます",
      },
      MoneyForm: {
        title: "締結状況による平均単価",
        description: "締結状況別の平均単価が表示されます",
      },
    },
    HistoryMain: {
      title: "締結された注文",
      description: "締結された注文が確認できます",
    },
    NonTradingMain: {
      title: "未締結注文",
      description: "未締結注文が確認できます",
    },
    ForgotPassword: {
      userId: {
        label: "ユーザーID",
        rules: "ユーザーIDを入力してください",
      },
      password: {
        label: "変更したいパスワード",
        rules: "変更したいパスワードを入力してください",
      },
      updateBtn: {
        label: "変更",
      },
      userIdAlert: "ユーザーIDがありません。",
      successAlert: "パスワード変更成功!",
    },
  },
  common: {
    TradeType: {
      BUY: "買い",
      SELL: "売り",
      RESERVATION: "予約",
    },
    TradeState: {
      WAIT: "未締結",
      SUCCESS: "締結",
      CANCEL: "キャンセル",
    },
  },
};
