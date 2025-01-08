import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { InstrumentType } from './instrument_types.entity';

@Entity('instruments')
export class Instrument {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => InstrumentType)
  @JoinColumn({ name: 'instrument_type_id' })
  instrumentType: InstrumentType;

  @Column()
  value: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
