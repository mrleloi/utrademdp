@Entity('admin_users')
export class AdminUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: string; // ADMIN, OPERATOR, VIEWER

  @Column('json')
  permissions: {
    canManageUsers: boolean;
    canViewAudit: boolean;
    canManagePermissions: boolean;
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}