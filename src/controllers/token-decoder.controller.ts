import { Controller, Get, Query, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Controller('inno')
export class TokenDecoderController {
  private readonly logger = new Logger(TokenDecoderController.name);

  constructor(private configService: ConfigService) {}

  @Get('decode')
  decodeToken(@Query('token') token: string) {
    try {
      const decodedToken = jwt.verify(
        token,
        this.configService.get('INNOVATION_JWT_PRIVATE_KEY'),
        {
          issuer: this.configService.get('INNOVATION_JWT_ISSUER'),
          audience: this.configService.get('INNOVATION_JWT_AUDIENCE'),
          algorithms: ['HS256'],
        },
      );

      this.logger.debug(
        `Successfully decoded token: ${JSON.stringify(decodedToken)}`,
      );

      return {
        success: true,
        data: decodedToken,
      };
    } catch (error) {
      this.logger.error(`Error decoding token: ${error.message}`);

      return {
        success: false,
        error: error.message,
      };
    }
  }
}
