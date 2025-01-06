@Entity('api_endpoints')
export class ApiEndpoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string; // Specific API path

  @Column()
  method: string; // HTTP method

  @Column()
  market_type: string; // Market data type this endpoint provides

  @ManyToOne(() => ApiGroup)
  group: ApiGroup;

  @Column()
  description: string;
}