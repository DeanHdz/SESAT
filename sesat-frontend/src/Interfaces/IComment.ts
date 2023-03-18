import { IReply } from "./IReply";

export interface IComment {
  userName: string; //turn into user data
  date: string;
  body: string;
  replies: IReply[];
}