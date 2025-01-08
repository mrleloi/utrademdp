import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiUser } from './api_users.entity';
import { ApiEndpoint } from './api_endpoints.entity';
import { PermissionLevel } from '@shared/constants';
import { ApiGroup } from './api_groups.entity';

@Entity('api_user_permissions')
export class ApiUserPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ApiUser)
  @JoinColumn({ name: 'user_id' })
  apiUser: ApiUser;

  @Column({
    type: 'enum',
    enum: PermissionLevel,
  })
  permission_level: PermissionLevel;

  @ManyToOne(() => ApiGroup, { nullable: true })
  @JoinColumn({ name: 'group_id' })
  apiGroup?: ApiGroup;

  @ManyToOne(() => ApiEndpoint, { nullable: true })
  @JoinColumn({ name: 'endpoint_id' })
  apiEndpoint?: ApiEndpoint;

  @Column({ type: 'json', nullable: true })
  allowed_instruments?: {
    instrument_type: string;
    values: string[];
  }[];

  @Column({ default: true })
  is_active: boolean;
}
