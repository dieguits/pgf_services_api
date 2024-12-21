import { Role } from '../../roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  // @PrimaryGeneratedColumn()
  @Column({ primary: true, generated: true, unique: true })
  id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deteledAt: Date;

  @ManyToOne(() => Role, (role) => role.id, {
    eager: true,
  })
  role: Role;
}
