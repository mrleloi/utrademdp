@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(ApiAccessLog)
    private accessLogRepo: Repository<ApiAccessLog>,
    private readonly redisService: RedisService,
  ) {}

  async logApiAccess(data: {
    userId: string;
    apiGroup: string;
    apiEndpoint: string;
    instrumentInfo: {
      ric?: string;
      ticker?: string;
      exchangeCode?: string;
    };
    requestParams: any;
    responseStatus: number;
    responseTime: number;
  }) {
    // Save to Redis first for real-time tracking
    await this.redisService.hincrby(
      `api_access:${data.userId}:${Date.now()}`,
      data.apiEndpoint,
      1
    );

    // Then save to DB for persistence
    const log = this.accessLogRepo.create({
      userId: data.userId,
      apiGroup: data.apiGroup,
      apiEndpoint: data.apiEndpoint,
      ric: data.instrumentInfo.ric,
      ticker: data.instrumentInfo.ticker,
      exchangeCode: data.instrumentInfo.exchangeCode,
      requestParams: data.requestParams,
      responseStatus: data.responseStatus,
      responseTime: data.responseTime,
    });

    await this.accessLogRepo.save(log);
  }
}