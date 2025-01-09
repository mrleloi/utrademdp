import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ITokenDecoder } from '@common/interfaces/token-decoder.interface';
import { ITokenExtractor } from '@common/interfaces/token-extractor.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export abstract class BaseAuthMiddleware implements NestMiddleware {
  constructor(
    protected readonly tokenDecoder: ITokenDecoder<any>,
    protected readonly tokenExtractors: ITokenExtractor[],
    protected readonly configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (this.shouldSkipAuth(req)) {
      return next();
    }

    let token: string | undefined;

    // Try each token extractor until we find a token, ordered
    for (const extractor of this.tokenExtractors) {
      token = extractor.extractToken(req);
      if (token) break;
    }

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const decoded = await this.tokenDecoder.decode(token, this.getConfig());
      req['apiUser'] = decoded['username'];
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  protected shouldSkipAuth(req: Request): boolean {
    return req.path.includes('/auth/token');
  }

  protected abstract getConfig(): any;
}
