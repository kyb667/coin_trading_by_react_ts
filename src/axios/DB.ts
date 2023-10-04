import { UserInfo } from "../models/UserInfo";
import { getData, insertData, updateData } from "./crud";
import { StateCode, Stock, DbName } from "../common";

// 会員登録
export const signIn = async (userInfo: UserInfo) => {
  // console.debug("signin 開始 ");

  const isExist = await getData(DbName.USER_DB, "userId", userInfo.userId);

  // 既に登録されているID？
  if (isExist.length !== 0) {
    return [isExist, StateCode.ERROR];
  }

  const isStockExist = await getData(
    DbName.STOCK_DB,
    "userId",
    userInfo.userId,
  );

  // ユーザーごとの株式テーブルにデータなし？
  if (isStockExist.length === 0) {
    // 登録して置く
    const [data, code] = await insertData(DbName.STOCK_DB, {
      userId: userInfo.userId,
      stock: Stock,
    });

    if (code === StateCode.ERROR) {
      return [[], StateCode.ERROR];
    }
  }

  const isWalletExist = await getData(
    DbName.WALLET_DB,
    "userId",
    userInfo.userId,
  );

  // ユーザーごとの株式テーブルにデータなし？
  if (isWalletExist.length === 0) {
    // 登録して置く
    const [data, code] = await insertData(DbName.WALLET_DB, {
      userId: userInfo.userId,
      wallet: 0,
    });

    if (code === StateCode.ERROR) {
      return [[], StateCode.ERROR];
    }
  }

  const [data, code] = await insertData(DbName.USER_DB, userInfo);

  // console.debug("signin 終了");
  return [data, code];
};

// ログイン
export const Login = async (userInfo: UserInfo) => {
  // console.debug("Login 開始 ");

  const isExist = await getData(DbName.USER_DB, "userId", userInfo.userId);

  // console.debug(isExist);

  if (isExist.length === 0) {
    return [[], StateCode.ERROR];
  }

  if (isExist[0].password !== userInfo.password) {
    return [[], StateCode.ERROR];
  }

  // console.debug("Login 終了 ");
  return [isExist, StateCode.SUCCESS];
};

// 有効株式変更
export const patchUserStock = async (
  userId: string,
  newStockList: React.Key[],
) => {
  // console.debug("patchUserStock 開始");
  // console.debug(userId);
  // console.debug(newStockList);

  const isExist = await getData(DbName.STOCK_DB, "userId", userId);

  const data = updateData(DbName.STOCK_DB, isExist[0].id, {
    stock: newStockList,
  });

  // console.debug("patchUserStock 終了 : ", data);
  return data;
};

// パスワード変更
export const patchUserPassword = async (
  userId: string,
  newPassword: string,
) => {
  // console.debug("patchUserPassword 開始");
  // console.debug(userId);
  // console.debug(newPassword);

  const isExist = await getData(DbName.USER_DB, "userId", userId);

  if (isExist.length === 0) {
    return StateCode.ERROR;
  }

  const data = updateData(DbName.USER_DB, isExist[0].id, {
    password: newPassword,
  });

  // console.debug("patchUserPassword 終了 : ", data);
  return data;
};
