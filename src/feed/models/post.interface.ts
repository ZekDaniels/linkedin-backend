import { IUser } from 'src/user/models/user.interface';

export interface IPost {
  id?: number;
  body?: string;
  created_at?: Date;
  author?: IUser;
}
