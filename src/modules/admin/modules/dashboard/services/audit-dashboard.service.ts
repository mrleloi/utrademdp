/*
@Injectable()
export class AuditDashboardService {
  constructor(
    @InjectRepository(ApiAccessHistory)
    private accessRepo: Repository<ApiAccessHistory>
  ) {}

  async getApiUsageStats(params: {
    startDate: Date;
    endDate: Date;
    groupBy: 'hour' | 'day' | 'month';
  }) {
    const query = this.accessRepo.createQueryBuilder('access')
      .select([
        `DATE_FORMAT(access.access_time, :format) as time_period`,
        'access.api_name',
        'COUNT(*) as count'
      ])
      .where('access.access_time BETWEEN :start AND :end', {
        start: params.startDate,
        end: params.endDate
      })
      .groupBy('time_period, access.api_name');

    // Set format based on groupBy
    const format = {
      hour: '%Y-%m-%d %H:00',
      day: '%Y-%m-%d',
      month: '%Y-%m'
    }[params.groupBy];

    return query.setParameter('format', format).getRawMany();
  }

  async getTopClients(params: {
    startDate: Date;
    endDate: Date;
    limit: number;
  }) {
    return this.accessRepo.createQueryBuilder('access')
      .select([
        'access.user_id',
        'COUNT(*) as request_count',
        'COUNT(DISTINCT access.api_name) as api_count'
      ])
      .where('access.access_time BETWEEN :start AND :end', {
        start: params.startDate,
        end: params.endDate
      })
      .groupBy('access.user_id')
      .orderBy('request_count', 'DESC')
      .limit(params.limit)
      .getRawMany();
  }

  async getMarketDataUsage(params: {
    startDate: Date;
    endDate: Date;
  }) {
    // Complex query to analyze market data usage
    const query = `
      SELECT 
        CASE 
          WHEN ric IS NOT NULL THEN 'inno-data'
          ELSE CONCAT(exchange, ' - ', ticker)
        END as market_identifier,
        COUNT(*) as access_count,
        COUNT(DISTINCT user_id) as unique_users
      FROM api_access_history
      WHERE access_time BETWEEN ? AND ?
      GROUP BY market_identifier
      ORDER BY access_count DESC
    `;

    return this.accessRepo.query(query, [params.startDate, params.endDate]);
  }
}*/
