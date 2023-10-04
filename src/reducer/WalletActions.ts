import { actionCreatorFactory } from "typescript-fsa";
import { WalletStock } from "../models/Wallet";

const actionCreator = actionCreatorFactory();

export const WalletActions = {
  updateWallet: actionCreator<number>("ACTION_UPDATE_WALLET"),
  updateWalletInfo: actionCreator<number>("ACTION_UPDATE_WALLET_INFO"),
  updateWalletStockInfo: actionCreator<WalletStock>(
    "ACTION_UPDATE_WALLET_STOCK_INFO",
  ),
};
