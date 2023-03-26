import { User } from "../models/user";

export interface ServerResponse {
  data: Array<User>;
  error: string;
}

export interface ServerUserResponse {
  data: User;
  error: string;
}
