import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiEndpoint } from './api_endpoints.entity';

@Entity('api_groups')
export class ApiGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  group_code: string; // INNO_DATA, UTRADE_SG, etc.

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => ApiEndpoint, (endpoint) => endpoint.apiGroup)
  endpoints: ApiEndpoint[];
}
