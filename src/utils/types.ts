export class User {
  email: string;
  userName: string;
  password?: string;
  posts?: {
    id: number;
    title: string;
  }[]
}
