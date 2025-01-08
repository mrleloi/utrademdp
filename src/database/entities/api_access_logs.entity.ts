import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiEndpoint } from './api_endpoints.entity';
import { ApiUser } from './api_users.entity';

@Entity('api_access_logs')
export class ApiAccessLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ApiUser, (user) => user.accessLogs)
  @JoinColumn({ name: 'user_id' })
  apiUser: ApiUser;

  @ManyToOne(() => ApiEndpoint)
  @JoinColumn({ name: 'endpoint_id' })
  apiEndpoint: ApiEndpoint;

  @Column({ type: 'json', nullable: true })
  request_params: object;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  access_time: Date;

  @Column({ nullable: true })
  response_status: number;

  @Column({ type: 'text', nullable: true })
  error_message: string;
}
