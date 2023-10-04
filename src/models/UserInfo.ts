type UserInfo = {
  userId: string;
  userName: string;
  password: string;
  id: number;
};

interface UserInfoList {
  userInfo: UserInfo[];
}

export { UserInfo, UserInfoList };
