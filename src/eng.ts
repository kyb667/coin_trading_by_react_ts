export const ENG = {
  component: {
    UserForm: {
      title: {
        label: "Welcome!",
      },
      userId: {
        label: "UserId",
        rules: "Please input your UserId!",
      },
      password: {
        label: "Password",
        rules: "Please input your password!",
      },
      ForgotPassword: {
        label: "Forgot Password",
      },
      RegisterNow: {
        label: "Register Now",
      },
      loginBtn: {
        label: "login",
      },
      alert: "Please verify the value you entered.",
    },
    SignIn: {
      userId: {
        label: "UserId",
        rules: "Please input your UserId!",
      },
      username: {
        label: "Username",
        rules: "Please input your username!",
      },
      password: {
        label: "Password",
        rules: "Please input your password!",
      },
      loginBtn: {
        label: "signin",
      },
      alert: "UserId already exists.",
    },
    TradeMain: {
      title: { label: "Trade" },
      stock: {
        label: "Stock",
        rules: "Please input Stock",
      },
      money: {
        label: "Money",
        rules: "Please input Trading Money",
      },
      buyBtn: {
        label: "Buy",
      },
      sellBtn: {
        label: "Sell",
      },
      reservationBtn: {
        label: "Reservation",
      },
      notFoundStockAlert: "I don't have any shares I bought.",
      noMoneyAlert: "The amount is insufficient.",
    },
    HeaderButton: {
      Main: {
        title: "Welcom !",
        description:
          "Let me explain about the virtual currency transaction service",
      },
      HomeBtn: {
        title: "home",
        description: "home button",
      },
      StockBtn: {
        title: "Stock",
        description: "you can select stock",
      },
      InfoBtn: {
        title: "MyInfo",
        description: "Check My Information",
      },
      Language: {
        title: "Language",
        description: "you can select language",
      },
      InfomationBtn: {
        title: "Infomation",
      },
      LogoutBtn: {
        title: "Logout",
        description: "logout button",
      },
    },
    TradeTimeline: {
      title: { label: "TimeLine" },
    },
    StockMain: {
      stockName: { label: "StockName" },
      Description: { label: "Description" },
      button: { label: "submit" },
      title: "choose the stock",
      description: "You can choose the stock you want to trade in",
    },
    ChargeForm: {
      money: { label: "Charge Money", rules: "Please input charge money!" },
      remember: {
        message: "i'm agree",
        rules: "Should accept agreement",
      },
      button: { label: "Charge" },
      resetButton: { label: "reset" },
      success: { message: "Charge Success", description: "送金額" },
    },
    Tab: {
      ChargeTab: { label: "Charge" },
      WalletTab: { label: "BalanceCheck" },
      HistoryTab: { label: "TradeHistory" },
      NonTradingTab: { label: "NonTrading" },
    },
    WalletForm: {
      StockName: { label: "StockName" },
      StockCnt: { label: "StockCnt" },
      AveragePrice: { label: "AveragePrice" },
    },
    MoneyForm: {
      StockName: { label: "StockName" },
      StockCnt: { label: "StockCnt" },
      waiteAveragePrice: { label: "waiteAveragePrice" },
      successAveragePrice: { label: "successAveragePrice" },
      allAveragePrice: { label: "allAveragePrice" },
    },
    History: {
      StockName: { label: "StockName" },
      TradeMoney: { label: "TradeMoney" },
      TradeType: { label: "TradeType" },
      TradeState: { label: "TradeState" },
      CreatedAt: { label: "CreatedAt" },
      UpdatedAt: { label: "UpdatedAt" },
    },
    ChartMain: {
      title: "チャート",
      description: "You can check the stock price",
    },
    TradeGrid: {
      Trade: {
        title: "changes in stock prices",
        description: "It shows the changes in stock prices",
      },
      TradeMain: {
        title: "Order Page",
        description:
          "You can place an order by entering the stock and stock price you want to order and pressing the button",
      },
      TradeTimeline: {
        title: "timeline",
        description: "You can check your order history",
      },
    },
    Charge: {
      NowWallet: {
        title: "status of money holdings",
        description: "You can check the status of your money",
      },
      ChargeForm: {
        title: "charge",
        description: "Enter the charge amount and press the button to recharge",
      },
    },
    WalletMain: {
      PieChartForm: {
        title: "circular chart",
        description: "Displays the percentage of shares held",
      },
      NowWallet: {
        title: "status of money holdings",
        description: "You can check the status of your money",
      },
      WalletForm: {
        title: "average unit price",
        description: "Average unit price is displayed by stock",
      },
      MoneyForm: {
        title: "Average unit price according to the status of conclusion",
        description:
          "The average unit price by status of conclusion is displayed",
      },
    },
    HistoryMain: {
      title: "Contracted Order",
      description: "You can check the Contracted order",
    },
    NonTradingMain: {
      title: "not Contracted Order",
      description: "You can check the not Contracted order",
    },
    ForgotPassword: {
      userId: {
        label: "UserId",
        rules: "Please input your UserId!",
      },
      password: {
        label: "Password",
        rules: "Please input your password!",
      },
      updateBtn: {
        label: "change",
      },
      userIdAlert: "UserId does not exist",
      successAlert: "Success!",
    },
  },
  common: {
    TradeType: {
      BUY: "Buy",
      SELL: "Sell",
      RESERVATION: "Reservation",
    },
    TradeState: {
      WAIT: "WAIT",
      SUCCESS: "SUCCESS",
      CANCEL: "CANCEL",
    },
  },
};
