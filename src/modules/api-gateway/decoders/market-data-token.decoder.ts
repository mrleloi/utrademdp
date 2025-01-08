import { Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { ITokenDecoder } from '@common/interfaces/token-decoder.interface';
import { MarketDataTokenPayload } from '@common/interfaces/token-payloads.interface';

interface MarketDataConfig {
  tokenSecret: string;
}

export class MarketDataTokenDecoder
  implements ITokenDecoder<MarketDataTokenPayload>
{
  private readonly logger = new Logger(MarketDataTokenDecoder.name);

  async decode(
    token: string,
    config: MarketDataConfig,
  ): Promise<MarketDataTokenPayload> {
    try {
      // Decode base64url to get encrypted bytes
      const encryptedBytes = Buffer.from(token, 'base64url');

      // Create key from first 32 bytes of secret
      const key = Buffer.from(config.tokenSecret, 'utf8').slice(0, 32);
      const decipher = crypto.createDecipheriv('aes-256-ecb', key, null);

      // Decrypt token
      const decrypted = Buffer.concat([
        decipher.update(encryptedBytes),
        decipher.final(),
      ]).toString('utf8');

      // Parse token parts
      const [broker, username, permissions, exchange, timestamp] =
        decrypted.split('|');

      this.logger.debug(`Decoded Market Data token parts:
        Broker: ${broker}
        User ID: ${username}
        Permissions: ${permissions}
        Exchange: ${exchange}
        Timestamp: ${timestamp}
      `);

      return {
        username,
        // broker,
        // permissions,
        // exchange,
        // timestamp,
      };
    } catch (error) {
      this.logger.error(`Error decoding Market Data token: ${error.message}`);
      throw error;
    }
  }
}
