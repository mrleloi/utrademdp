import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

export interface MarketTokenPayload {
  broker: string;
  uid: string;
  permissions: string;
  exchange: string;
}

@Injectable()
export class TokenEncoderService {
  generateToken(payload: MarketTokenPayload, secretKey: string): string {
    try {
      // Generate timestamp in GMT
      const timestamp = this.getCurrentTimestamp();

      // Combine token parts
      const rawToken = [
        payload.broker,
        payload.uid,
        payload.permissions,
        payload.exchange,
        timestamp,
      ].join('|');

      return this.encryptToken(rawToken, secretKey);
    } catch (error) {
      throw new Error(`Failed to generate market token: ${error.message}`);
    }
  }

  private getCurrentTimestamp(): string {
    return new Date().toISOString().replace(/[-T:]/g, '').slice(0, 14);
  }

  private encryptToken(rawToken: string, secretKey: string): string {
    try {
      // Use first 32 bytes of secret key
      const key = Buffer.from(secretKey, 'utf8').slice(0, 32);

      // Create cipher
      const cipher = crypto.createCipheriv('aes-256-ecb', key, null);

      // Encrypt
      const encrypted = Buffer.concat([
        cipher.update(rawToken, 'utf8'),
        cipher.final(),
      ]);

      // Convert to base64url
      return encrypted.toString('base64url');
    } catch (error) {
      throw new Error(`Token encryption failed: ${error.message}`);
    }
  }
}
