import { Controller, Post, Body, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InnoAuthService } from '../services/inno-auth.service';

interface AuthCredentials {
  username: string;
  password: string;
}

@Controller('inno/auth')
export class InnoAuthController {
  private readonly logger = new Logger(InnoAuthController.name);

  constructor(
    private readonly innoAuthService: InnoAuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('token')
  async getToken(@Body() credentials: AuthCredentials) {
    try {
      const innoResponse = await this.innoAuthService.authenticate(credentials);

      // Decode the received token
      const decodedToken = this.jwtService.decode(innoResponse.token);

      this.logger.debug(`Decoded inno token: ${JSON.stringify(decodedToken)}`);

      return {
        success: true,
        data: {
          token: innoResponse.token,
          decoded: decodedToken,
          expires_in: typeof decodedToken !== 'string' ?
            decodedToken.exp - Math.floor(Date.now() / 1000) :
            undefined
        }
      };
    } catch (error) {
      this.logger.error(`Authentication error: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }
}