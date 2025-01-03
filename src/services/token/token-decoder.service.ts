import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';

@Injectable()
export class TokenDecoderService {
  private readonly logger = new Logger(TokenDecoderService.name);

  constructor(private configService: ConfigService) {}

  async decodeInnoDataToken(token: string): Promise<{
    userId: string;
    permissions: any;
  }> {
    try {
      const decodedToken = jwt.verify(token,
        this.configService.get('INNOVATION_JWT_PRIVATE_KEY'),
        {
          issuer: this.configService.get('INNOVATION_JWT_ISSUER'),
          audience: this.configService.get('INNOVATION_JWT_AUDIENCE'),
          algorithms: ['HS256']
        }
      );

      this.logger.debug(`Decoded Inno-data token: ${JSON.stringify(decodedToken)}`);

      return {
        userId: decodedToken.sub, // or however user ID is stored in token
        permissions: decodedToken.permissions
      };
    } catch (error) {
      this.logger.error(`Error decoding Inno-data token: ${error.message}`);
      throw error;
    }
  }

  async decodeMarketDataToken(encryptedToken: string, secretKey: string): Promise<{
    userId: string;
    broker: string;
    permissions: string;
    exchange: string;
    timestamp: string;
  }> {
    try {
      // Decode base64url to get encrypted bytes
      const encryptedBytes = Buffer.from(encryptedToken, 'base64url');

      // Create key from first 32 bytes of secret
      const key = Buffer.from(secretKey, 'utf8').slice(0, 32);
      const decipher = crypto.createDecipheriv('aes-256-ecb', key, null);

      // Decrypt token
      const decrypted = Buffer.concat([
        decipher.update(encryptedBytes),
        decipher.final()
      ]).toString('utf8');

      // Parse token parts
      const [broker, userId, permissions, exchange, timestamp] = decrypted.split('|');

      this.logger.debug(`Decoded Market Data token parts:
        Broker: ${broker}
        User ID: ${userId}
        Permissions: ${permissions}
        Exchange: ${exchange}
        Timestamp: ${timestamp}
      `);

      return {
        broker,
        userId,
        permissions,
        exchange,
        timestamp
      };
    } catch (error) {
      this.logger.error(`Error decoding Market Data token: ${error.message}`);
      throw error;
    }
  }

  // Helper to validate decoded permissions against request parameters
  validatePermissions(decodedToken: any, requestParams: any): boolean {
    // Implement permission validation logic based on your requirements
    // For example, check if user has access to requested exchange, ticker, etc.
    return true; // Placeholder
  }
}

// Usage in middleware or guard
@Injectable()
export class TokenValidationMiddleware implements NestMiddleware {
  constructor(
    private tokenDecoderService: TokenDecoderService,
    private cacheService: CacheService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // Determine token type and decode accordingly
      let userId: string;
      let permissions: any;

      if (this.isInnoDataRequest(req)) {
        const decoded = await this.tokenDecoderService.decodeInnoDataToken(token);
        userId = decoded.userId;
        permissions = decoded.permissions;
      } else {
        const decoded = await this.tokenDecoderService.decodeMarketDataToken(
          token,
          this.getSecretKeyForRequest(req)
        );
        userId = decoded.userId;
        permissions = decoded.permissions;
      }

      // Cache user info and permissions
      await this.cacheService.set(`user:${userId}:permissions`, permissions);
      await this.cacheService.set(`user:${userId}:last_access`, new Date().toISOString());

      // Add to request for later use
      req['userId'] = userId;
      req['permissions'] = permissions;

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private isInnoDataRequest(req: Request): boolean {
    return req.path.includes('/inno-data');
  }

  private getSecretKeyForRequest(req: Request): string {
    // Return appropriate secret key based on request path/type
    if (req.path.includes('/ufuture')) {
      return 'ZHxUt4D/O11veWDEkyNO8N0ndaoryPsH==';
    }
    // Add other secret keys as needed
    return '';
  }
}