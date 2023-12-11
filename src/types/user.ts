export class User {
  id: number;
  email: string;
  fullName: string;
  userType: UserType;
  password: string;
}

export enum UserType {
  admin = "admin",
  basic = "basic"
}
