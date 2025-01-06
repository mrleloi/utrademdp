@Entity('api_access_logs')
export class ApiAccessLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  apiGroup: string; // INNO_DATA, UTRADE_SG, UTRADE_HK, UFUTURE

  @Column()
  apiEndpoint: string; // Actual endpoint path

  @Column({ nullable: true })
  ric: string;

  @Column({ nullable: true })
  ticker: string;

  @Column({ nullable: true })
  exchangeCode: string;

  @Column('json')
  requestParams: Record<string, any>;

  @CreateDateColumn()
  accessTime: Date;

  @Column()
  responseStatus: number;

  @Column()
  responseTime: number;
}