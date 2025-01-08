import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiAccessLog } from './api_access_logs.entity';
import { InstrumentType } from './instrument_types.entity';

@Entity('api_access_log_instruments')
export class ApiAccessLogInstrument {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ApiAccessLog)
  @JoinColumn({ name: 'access_log_id' })
  accessLog: ApiAccessLog;

  @ManyToOne(() => InstrumentType)
  @JoinColumn({ name: 'instrument_type_id' })
  instrumentType: InstrumentType;

  @Column()
  instrument_value: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
