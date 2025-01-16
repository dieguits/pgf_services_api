import { IsNumber, MinLength } from 'class-validator';
import { Attendance } from 'src/attendances/entities/attendance.entity';
import { Gender } from 'src/common/enums/gender.enum';
import { Family } from 'src/families/entities/family.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Member {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  email: string;

  @IsNumber()
  @MinLength(9)
  @Column({ nullable: true, type: 'bigint' })
  phone_number: string;

  @Column({ type: 'enum', enum: Gender })
  gender: string;

  @Column({ nullable: true })
  dob: Date;

  @ManyToOne(() => Family, (family) => family.id, {
    eager: true,
  })
  family: Family;

  @Column()
  user_created: number;

  @CreateDateColumn()
  date_created: Date;

  @Column()
  user_updated: number;

  @UpdateDateColumn()
  date_updated: Date;

  @OneToMany(() => Attendance, (att) => att.member)
  attendances: Attendance[];
}
