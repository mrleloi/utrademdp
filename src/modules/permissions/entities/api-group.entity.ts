@Entity('api_groups')
export class ApiGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // 'inno-data', 'utrade-hk', 'utrade-sg', 'ufuture'

  @Column()
  description: string;

  @OneToMany(() => ApiEndpoint, endpoint => endpoint.group)
  endpoints: ApiEndpoint[];
}
