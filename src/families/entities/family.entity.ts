import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Family {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @Column()
  user_created: number;

  @CreateDateColumn()
  createdDate: Date;

  @Column()
  user_updated: number;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deteledAt: Date;
}
