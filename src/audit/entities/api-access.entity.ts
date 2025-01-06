import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('api_access_history')
export class ApiAccessHistory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  access_time: Date;

  @Column({
    type: 'enum',
    enum: ['inno-data', 'utrade-hk', 'utrade-sg', 'ufuture']
  })
  api_name: string;

  @Column()
  user_id: string;

  @Column({ nullable: true })
  ric: string;

  @Column({ nullable: true })
  ticker: string;

  @Column({ nullable: true })
  exchange: string;

  @Column('json')
  request_params: Record<string, any>;
}