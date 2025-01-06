@Injectable()
export class ApiGatewayService {
  constructor(
    private readonly auditService: AuditService,
    private readonly tokenService: TokenService,
  ) {}

  async forwardRequest(req: Request, apiInfo: {
    group: string,
    baseUrl: string,
    requiresAuth: boolean
  }) {
    const startTime = Date.now();

    try {
      // Extract instrument info
      const instrumentInfo = this.extractInstrumentInfo(req);

      // Get/validate token if needed
      if (apiInfo.requiresAuth) {
        await this.tokenService.validateToken(req.headers.authorization);
      }

      // Forward request
      const response = await axios({
        method: req.method,
        url: `${apiInfo.baseUrl}${req.path}`,
        headers: req.headers,
        params: req.query,
        data: req.body
      });

      // Log access
      await this.auditService.logApiAccess({
        userId: req.userId,
        apiGroup: apiInfo.group,
        apiEndpoint: req.path,
        instrumentInfo,
        requestParams: {
          query: req.query,
          body: req.body
        },
        responseStatus: response.status,
        responseTime: Date.now() - startTime
      });

      return response.data;

    } catch (error) {
      // Log error
      await this.auditService.logApiAccess({
        userId: req.userId,
        apiGroup: apiInfo.group,
        apiEndpoint: req.path,
        instrumentInfo: this.extractInstrumentInfo(req),
        requestParams: {
          query: req.query,
          body: req.body
        },
        responseStatus: error.response?.status || 500,
        responseTime: Date.now() - startTime
      });

      throw error;
    }
  }

  private extractInstrumentInfo(req: Request) {
    return {
      ric: req.query.ric as string,
      ticker: req.query.ticker as string,
      exchangeCode: req.query.exchangeCode as string
    };
  }
}