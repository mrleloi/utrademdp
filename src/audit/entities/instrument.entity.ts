import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('instruments')
export class Instrument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ric: string;

  @Column({ nullable: true })
  ticker: string;

  @Column({ nullable: true })
  exchange: string;

  @CreateDateColumn()
  created_at: Date;
}