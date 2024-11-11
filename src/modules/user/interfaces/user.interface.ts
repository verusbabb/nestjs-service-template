import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}
