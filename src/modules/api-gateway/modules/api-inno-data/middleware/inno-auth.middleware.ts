import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseAuthMiddleware } from '../../../middleware/base-auth.middleware';
import { JwtTokenDecoder } from '../../../decoders/jwt-token.decoder';
import { HeaderXAuthTokenExtractor } from '@modules/api-gateway/extractors/header-x-auth-token.extractor';
import { Request } from 'express';
import { API_IDS } from '@shared/constants';

@Injectable()
export class InnoDataAuthMiddleware extends BaseAuthMiddleware {
  constructor(
    private readonly jwtTokenDecoder: JwtTokenDecoder,
    configService: ConfigService,
  ) {
    super(jwtTokenDecoder, [new HeaderXAuthTokenExtractor()], configService);
  }

  protected shouldSkipAuth(req: Request): boolean {
    return req.path.includes('/auth/token');
  }

  protected getConfig(): any {
    return this.configService.get(`apiGateway.apis.${API_IDS.INNO_DATA}`);
  }
}
