import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiUserPermission } from './api_user_permissions.entity';
import { ApiAccessLog } from './api_access_logs.entity';

@Entity('api_users')
export class ApiUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @OneToMany(() => ApiUserPermission, (permission) => permission.apiUser)
  permissions: ApiUserPermission[];

  @OneToMany(() => ApiAccessLog, (log) => log.apiUser)
  accessLogs: ApiAccessLog[];
}
