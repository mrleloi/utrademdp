import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'periodic_query_config' })
export class Configuration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  interval_seconds: number;

  @Column('int')
  duration_minutes: number;
}
