import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('instrument_types')
export class InstrumentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  type_code: string; // ric, ticker, exchangeCode

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
