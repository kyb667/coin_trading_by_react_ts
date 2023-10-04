import { actionCreatorFactory } from "typescript-fsa";
import { UserInfo } from "../models/UserInfo";

const actionCreator = actionCreatorFactory();

// type UserInfo = {
//   username: string;
//   password: string;
// };

export const UserActions = {
  updateUserInfo: actionCreator<Array<UserInfo>[]>("ACTION_UPDATE_USER_INFO"),
};
