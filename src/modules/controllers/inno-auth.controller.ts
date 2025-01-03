// src/controllers/inno-auth.controller.ts
import { Controller, Post, Body, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InnoAuthService } from '../services/inno-auth.service';

@Controller('inno/auth')
export class InnoAuthController {
  private readonly logger = new Logger(InnoAuthController.name);

  constructor(
    private readonly innoAuthService: InnoAuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Post('token')
  async getToken(@Body() credentials: { username: string; password: string }) {
    try {
      const innoResponse = await this.innoAuthService.authenticate(credentials);

      // Decode the received token to check expiration and other claims
      const decodedToken = this.jwtService.decode(innoResponse.token);

      this.logger.debug(`Decoded inno token: ${JSON.stringify(decodedToken)}`);

      // Option 1: Return original token
      return {
        success: true,
        data: {
          token: innoResponse.token,
          decoded: decodedToken,
          expires_in: decodedToken['exp'] - Math.floor(Date.now() / 1000)
        }
      };

      /* Option 2: Generate MDP token
      const mdpToken = await this.jwtService.signAsync({
        sub: credentials.username,
        inno_token: innoResponse.token,
        exp: decodedToken['exp'],
        type: 'inno_data'
      });

      return {
        success: true,
        data: {
          token: mdpToken,
          expires_in: decodedToken['exp'] - Math.floor(Date.now() / 1000)
        }
      };
      */
    } catch (error) {
      this.logger.error(`Authentication error: ${error.message}`);
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
