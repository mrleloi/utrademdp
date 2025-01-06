import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from './redis.service';

@Injectable()
export class InnoAuthService {
  private readonly logger = new Logger(InnoAuthService.name);
  private readonly baseUrl = 'https://t1widgetlib.trkd-hs.com/inno-data-api';

  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async authenticate(credentials: { username: string; password: string }) {
    try {
      // Check Redis cache first
      const cachedToken = await this.redisService.get(`inno_token:${credentials.username}`);
      if (cachedToken) {
        // Verify if cached token is still valid
        const decodedToken = this.jwtService.decode(cachedToken);
        if (decodedToken && typeof decodedToken !== 'string' && decodedToken.exp > Math.floor(Date.now() / 1000)) {
          return { token: cachedToken };
        }
      }

      // Make request to Inno Data API
      const response = await fetch(`${this.baseUrl}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new HttpException(
          'Authentication failed',
          HttpStatus.UNAUTHORIZED,
        );
      }

      // Get token from header
      const token = response.headers.get('token');
      if (!token) {
        throw new HttpException(
          'No token in response',
          HttpStatus.BAD_GATEWAY,
        );
      }

      // Cache the token
      const decodedToken = this.jwtService.decode(token);
      if (decodedToken && typeof decodedToken !== 'string') {
        const ttl = decodedToken.exp - Math.floor(Date.now() / 1000);
        await this.redisService.set(
          `inno_token:${credentials.username}`,
          token,
          ttl
        );
      }

      return { token };
    } catch (error) {
      this.logger.error(`Authentication request failed: ${error.message}`);
      throw error;
    }
  }
}