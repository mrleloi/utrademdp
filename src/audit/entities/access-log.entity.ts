import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Instrument } from './instrument.entity';

@Entity('access_logs')
export class AccessLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  api_id: number;

  @Column()
  user_id: string;

  @ManyToOne(() => Instrument)
  @JoinColumn({ name: 'instrument_id' })
  instrument: Instrument;

  @Column('json')
  request_params: Record<string, any>;

  @Column()
  response_status: number;

  @Column()
  response_time: number;

  @CreateDateColumn()
  timestamp: Date;
}