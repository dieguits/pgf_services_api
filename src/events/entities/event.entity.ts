import { IsNumber } from 'class-validator';
import { EVENT_TYPE } from 'src/common/enums/event-type.enum';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class Event {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ type: 'enum', enum: EVENT_TYPE })
  type: string;

  @Column()
  event_date: Date;

  @IsNumber()
  @Column()
  assigned_to: number;

  @IsNumber()
  @Column({ nullable: true })
  supported_by: number;

  @Column()
  user_created: number;

  @CreateDateColumn()
  date_created: Date;

  @Column()
  user_updated: number;

  @UpdateDateColumn()
  date_updated: Date;
}
