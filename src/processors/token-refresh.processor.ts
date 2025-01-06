@Processor('token-refresh')
export class TokenRefreshProcessor {
  constructor(
    private readonly tokenService: TokenService,
    private readonly cacheService: CacheService,
  ) {}

  @Process('refresh-token')
  async handleTokenRefresh(job: Job) {
    const { userId, apiType } = job.data;

    try {
      const newToken = await this.tokenService.refreshToken(userId, apiType);
      await this.cacheService.setCachedToken(
        `${apiType}:${userId}`,
        newToken.token,
        newToken.ttl
      );
    } catch (error) {
      // If token refresh fails, it will be retried based on queue configuration
      throw error;
    }
  }
}