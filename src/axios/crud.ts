import axios from "axios";
import { StateCode, Stock } from "../common";
const URL = "https://czjqq6-3001.csb.app";

export const getData = async (
  tableName: string,
  selectKey: string,
  selectValue: any,
) => {
  // console.debug("getData 開始");

  const url = `${URL}/${tableName}?${selectKey}=${selectValue}`;
  // console.debug("url : ", url);

  const data = await axios
    .get(url)
    .then((res) => {
      return [...res.data];
    })
    .catch((err) => {
      return [];
    });

  // console.info("getData 終了 : ", data);
  return data;
};

export const insertData = async (tableName: string, body: any) => {
  // console.debug("insertData 開始 ");

  const url = `${URL}/${tableName}`;
  // console.debug("url : ", url);

  const [data, code] = await axios
    .post(url, body)
    .then((res) => {
      return [[{ ...res.data }], StateCode.SUCCESS];
    })
    .catch((err) => {
      return [[], StateCode.ERROR];
    });

  // console.debug("insertData 終了 ");
  return [data, code];
};

export const updateData = async (
  tableName: string,
  id: number | string,
  body: any,
) => {
  // console.debug("updateData 開始");
  // console.debug(id);
  // console.debug(body);

  const url = `${URL}/${tableName}/${id}`;

  const data = await axios
    .patch(url, body)
    .then((res) => {
      return StateCode.SUCCESS;
    })
    .catch((err) => {
      console.error(err);
      return StateCode.ERROR;
    });

  // console.debug("updateData 終了 : ", data);
  return data;
};

export const deleteData = async (tableName: string, id: number | string) => {
  // console.debug("deleteData 開始");
  // console.debug(id);

  const url = `${URL}/${tableName}/${id}`;

  const data = await axios
    .delete(url)
    .then((res) => {
      return StateCode.SUCCESS;
    })
    .catch((err) => {
      console.error(err);
      return StateCode.ERROR;
    });

  // console.debug("deleteData 終了 : ", data);
  return data;
};
