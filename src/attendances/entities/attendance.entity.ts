import { Event } from 'src/events/entities/event.entity';
import { Member } from 'src/members/entities/member.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Attendance {
  @Column({ primary: true, generated: true })
  id: number;

  //   @Column()
  //   event_id: number;

  @ManyToOne(() => Event, (event) => event.id, {
    eager: true,
  })
  event: Event;

  //   @Column()
  //   member_id: number;

  //   @ManyToOne(() => Member, (member) => member.attendances, {
  //     eager: true,
  //   })
  //   member: Member;
  @ManyToOne(() => Member, (member) => member.id, {
    eager: true,
  })
  member: Member;

  @Column()
  user_created: number;

  @CreateDateColumn()
  date_created: Date;

  @Column()
  user_updated: number;

  @UpdateDateColumn()
  date_updated: Date;
}
