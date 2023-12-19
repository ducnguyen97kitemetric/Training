export type UserInfo = {
  email: string;
  fullName: string;
  userType: UserType;
}

export enum UserType {
  admin,
  basic
}
