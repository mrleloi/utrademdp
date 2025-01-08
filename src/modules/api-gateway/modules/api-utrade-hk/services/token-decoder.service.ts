import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { API_IDS } from '@shared/constants';
import { MarketDataTokenDecoder } from '@modules/api-gateway/decoders/market-data-token.decoder';

@Injectable()
export class TokenDecoderService {
  private readonly decoder: MarketDataTokenDecoder;

  constructor(private configService: ConfigService) {
    this.decoder = new MarketDataTokenDecoder();
  }

  async decode(token: string) {
    const config = this.configService.get('apiGateway.apis')[API_IDS.UTRADE_HK];
    return this.decoder.decode(token, config);
  }
}
