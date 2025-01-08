import {
  All,
  Controller,
  Get,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UfutureApiProxyService } from '../services/api-proxy.service';
import { ConfigService } from '@nestjs/config';
import { TokenEncoderService } from '@modules/api-gateway/encoders/market-data-token.encoder';
import { API_IDS } from '@shared/constants';

@Controller('api-gateway/ufuture')
export class UfutureApiProxyController {
  private readonly secretKey: string;

  constructor(
    private readonly apiProxyService: UfutureApiProxyService,
    private readonly marketDataEncoder: TokenEncoderService,
    private readonly configService: ConfigService,
  ) {
    this.secretKey =
      this.configService.get('apiGateway.apis')[API_IDS.UFUTURE].tokenSecret;
  }

  @Get('auth/login')
  async login(@Query('uid') uid: string, @Query('pwd') pwd: string) {
    try {
      if (uid !== 'uobkhhk' || pwd !== 'labci001') {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        broker: 'UOBKH',
        uid,
        permissions: '00000000000000222222',
        exchange: 'SG',
      };

      const token = this.marketDataEncoder.generateToken(
        payload,
        this.secretKey,
      );

      return {
        responseCode: 0,
        data: { token },
        responseTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
      };
    } catch (error) {
      return {
        responseCode: 1,
        error: error.message,
        responseTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
      };
    }
  }

  @All(['*', '!auth/login'])
  async proxy(@Req() request: Request) {
    return this.apiProxyService.proxy(request);
  }
}
