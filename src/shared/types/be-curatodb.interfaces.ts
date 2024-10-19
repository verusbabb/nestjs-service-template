import { Types } from 'mongoose';
import { UserRole } from './index';

export interface IUser {
  username: string;
  password: string;
  role: UserRole;
  _id: Types.ObjectId;
}