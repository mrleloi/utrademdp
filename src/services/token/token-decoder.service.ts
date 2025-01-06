import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';

interface InnoDataJwtPayload {
  sub: string;
  username: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

@Injectable()
export class TokenDecoderService {
  private readonly logger = new Logger(TokenDecoderService.name);

  constructor(private configService: ConfigService) {}

  async decodeInnoDataToken(token: string): Promise<{
    userId: string;
    permissions: any;
  }> {
    try {
      const decodedToken = jwt.verify(
        token,
        this.configService.get('INNOVATION_JWT_PRIVATE_KEY'),
        {
          issuer: this.configService.get('INNOVATION_JWT_ISSUER'),
          audience: this.configService.get('INNOVATION_JWT_AUDIENCE'),
          algorithms: ['HS256'],
        },
      ) as InnoDataJwtPayload; // Type assertion here

      this.logger.debug(
        `Decoded Inno-data token: ${JSON.stringify(decodedToken)}`,
      );

      return {
        userId: decodedToken.username || decodedToken.sub, // Using username or sub as userId
        permissions: {
          ...decodedToken,
          // Omit sensitive or unnecessary information if needed
          sub: undefined,
        },
      };
    } catch (error) {
      this.logger.error(`Error decoding Inno-data token: ${error.message}`);
      throw error;
    }
  }

  async decodeMarketDataToken(
    encryptedToken: string,
    secretKey: string,
  ): Promise<{
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
        decipher.final(),
      ]).toString('utf8');

      // Parse token parts
      const [broker, userId, permissions, exchange, timestamp] =
        decrypted.split('|');

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
        timestamp,
      };
    } catch (error) {
      this.logger.error(`Error decoding Market Data token: ${error.message}`);
      throw error;
    }
  }
}
