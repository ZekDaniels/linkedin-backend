import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';
import { Post } from 'src/feed/models/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
