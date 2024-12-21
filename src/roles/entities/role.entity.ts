import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity()
export class Role {
  @Column({ primary: true, unique: true })
  id: string;

  @Column()
  role: string;

  @CreateDateColumn()
  createdDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
