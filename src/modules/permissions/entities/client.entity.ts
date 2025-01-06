@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  client_id: string;

  @Column()
  name: string;

  @Column()
  status: string; // 'active', 'inactive'

  @OneToMany(() => ClientPermission, permission => permission.client)
  permissions: ClientPermission[];
}