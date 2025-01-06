import { Injectable, Logger } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
import { QueueService } from '../queue/queue.service';
import { retry } from 'rxjs/operators';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);

  constructor(
    private readonly cacheService: CacheService,
    private readonly queueService: QueueService,
  ) {}

  async handleRequest(request: any, targetApi: string): Promise<any> {
    try {
      // 1. Check cache for token
      const userId = this.extractUserId(request);
      const cachedToken = await this.cacheService.getCachedToken(`${targetApi}:${userId}`);

      if (cachedToken) {
        return this.forwardRequest(request, targetApi, cachedToken);
      }

      // 2. Generate new token
      const newToken = await this.generateToken(userId, targetApi);
      await this.cacheService.setCachedToken(`${targetApi}:${userId}`, newToken.token, newToken.ttl);

      // 3. Forward request with retry mechanism
      return await this.forwardRequestWithRetry(request, targetApi, newToken.token);
    } catch (error) {
      this.logger.error(`Error handling request: ${error.message}`);
      throw error;
    }
  }

  // Optimized proxy forwarding
  async forwardRequest(request: any) {
    const startTime = process.hrtime();

    try {
      // 1. Fast path: check cache
      const cachedResponse = await this.checkCache(request);
      if (cachedResponse) return cachedResponse;

      // 2. Validate token async
      const tokenPromise = this.getValidToken(request);

      // 3. Prepare request params async
      const paramsPromise = this.prepareParams(request);

      // 4. Wait for both to complete
      const [token, params] = await Promise.all([
        tokenPromise,
        paramsPromise
      ]);

      // 5. Forward request
      const response = await this.sendRequest(token, params);

      // 6. Async operations (don't wait)
      this.updateCache(request, response).catch(console.error);
      this.queueAuditLog(request, response).catch(console.error);

      return response;
    } catch (error) {
      // Handle error appropriately
    }
  }

  private async forwardRequestWithRetry(request: any, targetApi: string, token: string) {
    const maxRetries = 3;
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await this.forwardRequest(request, targetApi, token);

        // Queue audit log asynchronously
        await this.queueService.queueAuditLog({
          userId: this.extractUserId(request),
          targetApi,
          request: this.sanitizeRequest(request),
          response: this.sanitizeResponse(response),
          timestamp: new Date()
        });

        return response;
      } catch (error) {
        lastError = error;
        if (!this.shouldRetry(error)) {
          throw error;
        }
        await this.delay(Math.pow(2, attempt) * 1000); // Exponential backoff
      }
    }

    throw lastError;
  }

  private shouldRetry(error: any): boolean {
    // Retry on network errors or 5xx responses
    return error.isNetworkError || (error.response?.status >= 500);
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}