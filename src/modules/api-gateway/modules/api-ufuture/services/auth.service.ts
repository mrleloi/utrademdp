import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { API_IDS } from '@shared/constants';

@Injectable()
export class UFutureAuthService {
  private readonly ALGO = 'aes-128-ecb'; // AES = aes-128-ecb in Node.js

  constructor(private readonly configService: ConfigService) {}

  async generateToken(userId: string): Promise<string> {
    try {
      // Get encryption key from config
      const config = this.configService.get(
        `apiGateway.apis.${API_IDS.UFUTURE}`,
      );
      if (!config?.tokenSecret) {
        throw new Error('Token secret is not configured');
      }

      const key = this.getKey(config.tokenSecret);
      console.log('Generate - Key length:', key.length);
      console.log('Generate - Key buffer:', key);

      // Create token string
      const now = new Date();
      const gmtTime = new Date(now.getTime());
      const timestamp = gmtTime
        .toISOString()
        .replace(/[-T:]/g, '')
        .slice(0, 14);

      const tokenParts = [
        'UOBKH',
        userId,
        '00000000000000000000',
        'SG',
        timestamp,
      ];
      const tokenString = tokenParts.join('|');
      console.log('Token string:', tokenString);

      // Create cipher with exact 16-byte key
      const cipher = crypto.createCipheriv(this.ALGO, key, null);

      // Encrypt
      const encrypted = Buffer.concat([
        cipher.update(tokenString, 'utf8'),
        cipher.final(),
      ]);

      // Convert to base64url
      return this.toBase64URL(encrypted);
    } catch (error) {
      console.error('Full error:', error);
      throw new Error(`Failed to generate token: ${error.message}`);
    }
  }

  // Convert to base64url (RFC 4648)
  private toBase64URL(buffer: Buffer): string {
    return buffer
      .toString('base64')
      .replace(/\+/g, '-') // Convert + to -
      .replace(/\//g, '_') // Convert / to _
      .replace(/=+$/, ''); // Remove ending =
  }

  // Tạo helper method để xử lý key
  private getKey(secretKey: string): Buffer {
    const rawKey = Buffer.from(secretKey, 'utf8');
    const key = Buffer.alloc(16); // Create a 16-byte buffer
    rawKey.copy(key, 0, 0, 16); // Copy up to 16 bytes
    return key;
  }

  async verifyToken(token: string): Promise<string> {
    try {
      const config = this.configService.get(
        `apiGateway.apis.${API_IDS.UFUTURE}`,
      );
      if (!config?.tokenSecret) {
        throw new Error('Token secret is not configured');
      }

      const key = this.getKey(config.tokenSecret);
      console.log('Verify - Key length:', key.length);
      console.log('Verify - Key buffer:', key);

      // Convert base64url to base64
      const base64 = token.replace(/-/g, '+').replace(/_/g, '/');

      // Add padding if needed
      const padding = base64.length % 4;
      const paddedToken = padding ? base64 + '='.repeat(4 - padding) : base64;

      // Create decipher with exact 16-byte key
      const decipher = crypto.createDecipheriv(this.ALGO, key, null);

      // Decrypt
      const decrypted = Buffer.concat([
        decipher.update(Buffer.from(paddedToken, 'base64')),
        decipher.final(),
      ]);

      const decryptedString = decrypted.toString('utf8');
      console.log('Decrypted string:', decryptedString);

      return decryptedString;
    } catch (error) {
      console.error('Verify error:', error);
      throw new Error(`Failed to verify token: ${error.message}`);
    }
  }
}
