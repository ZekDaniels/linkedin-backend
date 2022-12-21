import { IPost } from 'src/feed/models/post.interface';
import { Role } from './role.enum';

export interface IUser {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  role: Role;
  posts: IPost[];
  created_at?: Date;
}
