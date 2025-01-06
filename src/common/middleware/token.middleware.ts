// src/common/middleware/token.middleware.ts
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenDecoderService } from '../../services/token/token-decoder.service';
import { RedisService } from '../../services/redis.service';

// Define interfaces for decoded token results
interface DecodedMarketToken {
  userId: string;
  permissions: string;
}

// Extend Express Request to include our custom properties
interface CustomRequest extends Request {
  userId?: string;
  permissions?: any;
}

@Injectable()
export class TokenValidationMiddleware implements NestMiddleware {
  constructor(
    private tokenDecoderService: TokenDecoderService,
    private cacheService: RedisService,
  ) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const authHeader = req.get('authorization');
    const headerToken = authHeader?.split(' ')[1];
    const queryToken = req.query.token as string;
    const token = headerToken || queryToken;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      let userId: string;
      let permissions: any;

      if (this.isInnoDataRequest(req)) {
        const decoded: { userId: string; permissions: any } =
          await this.tokenDecoderService.decodeInnoDataToken(token);
        userId = decoded.userId;
        permissions = decoded.permissions;
      } else {
        const decoded: DecodedMarketToken =
          await this.tokenDecoderService.decodeMarketDataToken(
            token,
            this.getSecretKeyForRequest(req),
          );
        userId = decoded.userId;
        permissions = decoded.permissions;
      }

      // Cache user info and permissions
      await this.cacheService.set(`user:${userId}:permissions`, permissions);
      await this.cacheService.set(
        `user:${userId}:last_access`,
        new Date().toISOString(),
      );

      // Add to request for later use
      req.userId = userId;
      req.permissions = permissions;

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private isInnoDataRequest(req: Request): boolean {
    return req.url.includes('/inno-data');
  }

  private getSecretKeyForRequest(req: Request): string {
    // Return appropriate secret key based on request url/type
    if (req.url.includes('/utradefuture')) {
      return 'ZHxUt4D/O11veWDEkyNO8N0ndaoryPsH==';
    }

    if (req.url.includes('/utrade-hk')) {
      return process.env.UTRADE_HK_SECRET_KEY || '';
    }

    if (req.url.includes('/utrade-sg')) {
      return process.env.UTRADE_SG_SECRET_KEY || '';
    }

    return '';
  }
}