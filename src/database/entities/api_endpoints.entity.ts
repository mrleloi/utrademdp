import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiGroup } from './api_groups.entity';

@Entity('api_endpoints')
export class ApiEndpoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  endpoint_pattern: string; // e.g. /charts/mts/{ric}

  @Column()
  method: string; // GET, POST, etc.

  @Column()
  description: string;

  @Column('json')
  path_params: object; // e.g. { ric: { type: 'ric', required: true } }

  @Column('json', { nullable: true })
  query_params: object; // e.g. { interval: { type: 'string', required: false } }

  @ManyToOne(() => ApiGroup, (group) => group.endpoints)
  @JoinColumn({ name: 'group_id' })
  apiGroup: ApiGroup;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
