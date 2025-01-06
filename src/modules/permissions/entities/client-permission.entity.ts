@Entity('client_permissions')
export class ClientPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client)
  client: Client;

  @ManyToOne(() => ApiEndpoint)
  endpoint: ApiEndpoint;

  @Column('json')
  market_data_access: {
    markets: string[];  // List of allowed markets
    permission_level: string; // 'realtime', 'delayed', etc.
  };

  @Column()
  valid_from: Date;

  @Column()
  valid_until: Date;

  @Column()
  status: string; // 'active', 'suspended', 'expired'
}