import { IUser } from 'src/auth/models/user.interface';

export interface IPost {
  id?: number;
  body?: string;
  created_at?: Date;
  author?: IUser;
}
