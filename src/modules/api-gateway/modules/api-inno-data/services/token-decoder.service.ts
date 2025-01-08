import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtTokenDecoder } from '@modules/api-gateway/decoders/jwt-token.decoder';
import { API_IDS } from '@shared/constants';

@Injectable()
export class TokenDecoderService {
  private readonly decoder: JwtTokenDecoder;

  constructor(private configService: ConfigService) {
    this.decoder = new JwtTokenDecoder();
  }

  async decode(token: string) {
    const config = this.configService.get('apiGateway.apis')[API_IDS.INNO_DATA];
    return this.decoder.decode(token, config);
  }
}
