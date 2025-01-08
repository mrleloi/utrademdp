import { Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Algorithm } from 'jsonwebtoken';
import { ITokenDecoder } from '@common/interfaces/token-decoder.interface';
import { InnoDataTokenPayload } from '@common/interfaces/token-payloads.interface';

interface JwtConfig {
  tokenSecret: string;
  jwt: {
    issuer: string;
    audience: string;
    algorithm: Algorithm;
  };
}

interface JwtPayload {
  sub: string;
  username: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

export class JwtTokenDecoder implements ITokenDecoder<InnoDataTokenPayload> {
  private readonly logger = new Logger(JwtTokenDecoder.name);

  async decode(
    token: string,
    config: JwtConfig,
  ): Promise<InnoDataTokenPayload> {
    try {
      const decodedToken = jwt.verify(token, config.tokenSecret, {
        complete: true,
        issuer: config.jwt.issuer,
        audience: config.jwt.audience,
        algorithms: [config.jwt.algorithm],
      }) as unknown as JwtPayload;

      return {
        username: decodedToken['payload']['username'],
      };
    } catch (error) {
      this.logger.error(`Error decoding JWT token: ${error.message}`);
      throw error;
    }
  }
}
