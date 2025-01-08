import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password_hash: string;

  @Column()
  full_name: string;

  @Column()
  role: string; // 'admin', 'operator', 'viewer'

  @Column('json')
  permissions: {
    can_manage_clients: boolean;
    can_manage_permissions: boolean;
    can_view_audit: boolean;
    can_manage_staff: boolean;
  };
}
