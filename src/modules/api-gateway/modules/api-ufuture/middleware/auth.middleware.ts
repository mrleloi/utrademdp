import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseAuthMiddleware } from '../../../middleware/base-auth.middleware';
import { QueryTokenExtractor } from '@modules/api-gateway/extractors/query-token.extractor';
import { API_IDS } from '@shared/constants';
import { MarketDataTokenDecoder } from '@modules/api-gateway/decoders/market-data-token.decoder';
import { Request } from 'express';
import { HeaderBearerTokenExtractor } from '@modules/api-gateway/extractors/header-bearer-token.extractor';

@Injectable()
export class UfutureAuthMiddleware extends BaseAuthMiddleware {
  constructor(
    private readonly marketDataDecoder: MarketDataTokenDecoder,
    configService: ConfigService,
  ) {
    super(
      marketDataDecoder,
      [new QueryTokenExtractor(), new HeaderBearerTokenExtractor()],
      configService,
    );
  }

  protected shouldSkipAuth(req: Request): boolean {
    return req.path.includes('/auth/login');
  }

  protected getConfig(): any {
    return this.configService.get(`apiGateway.apis.${API_IDS.UFUTURE}`);
  }
}
