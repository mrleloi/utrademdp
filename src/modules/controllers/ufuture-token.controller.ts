// src/controllers/ufuture-token.controller.ts
import { Controller, Get, Query, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Controller('utradefuture')
export class UFutureTokenController {
  private readonly logger = new Logger(UFutureTokenController.name);
  private readonly secretKey = 'ZHxUt4D/O11veWDEkyNO8N0ndaoryPsH==';

  constructor(private configService: ConfigService) {}

  @Get('encode')
  generateToken(@Query('uid') uid: string, @Query('pwd') pwd: string) {
    try {
      // Generate raw token parts
      const broker = 'UOBKH';
      const timestamp = this.getCurrentTimestamp();
      const permissions = '00000000000000222222'; // Default permissions string
      const exchange = 'SG';

      // Combine token parts
      const rawToken = [
        broker,
        uid,
        permissions,
        exchange,
        timestamp
      ].join('|');

      this.logger.debug(`Raw token: ${rawToken}`);

      // Encrypt token
      const encryptedToken = this.encryptToken(rawToken);

      return {
        success: true,
        data: {
          raw_token: rawToken,
          encrypted_token: encryptedToken
        }
      };
    } catch (error) {
      this.logger.error(`Error generating token: ${error.message}`);

      return {
        success: false,
        error: error.message
      };
    }
  }

  @Get('decode')
  decodeToken(@Query('token') token: string) {
    try {
      // Decode base64url to get encrypted bytes
      const encryptedBytes = Buffer.from(token, 'base64url');

      // Create key from first 32 bytes of secret
      const key = Buffer.from(this.secretKey, 'utf8').slice(0, 32);
      const decipher = crypto.createDecipheriv('aes-256-ecb', key, null);

      // Decrypt token
      const decrypted = Buffer.concat([
        decipher.update(encryptedBytes),
        decipher.final()
      ]).toString('utf8');

      // Parse token parts
      const [broker, userId, permissions, exchange, timestamp] = decrypted.split('|');

      this.logger.debug(`Decoded token parts: ${decrypted}`);

      return {
        success: true,
        data: {
          raw_token: decrypted,
          parts: {
            broker,
            userId,
            permissions,
            exchange,
            timestamp
          }
        }
      };
    } catch (error) {
      this.logger.error(`Error decoding token: ${error.message}`);

      return {
        success: false,
        error: error.message
      };
    }
  }

  private getCurrentTimestamp(): string {
    return new Date().toISOString()
      .replace(/[-T:]/g, '')
      .slice(0, 14);
  }

  private encryptToken(rawToken: string): string {
    try {
      // Use first 32 bytes of secret key
      const key = Buffer.from(this.secretKey, 'utf8').slice(0, 32);

      // Create cipher
      const cipher = crypto.createCipheriv('aes-256-ecb', key, null);

      // Encrypt
      const encrypted = Buffer.concat([
        cipher.update(rawToken, 'utf8'),
        cipher.final()
      ]);

      // Convert to base64url
      return encrypted.toString('base64url');
    } catch (error) {
      this.logger.error(`Encryption error: ${error.message}`);
      throw error;
    }
  }
}
