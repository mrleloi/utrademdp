import { registerAs } from '@nestjs/config';
import { API_IDS } from '@shared/constants';
import { Algorithm } from 'jsonwebtoken';

export const apiGatewayConfig = registerAs('apiGateway', () => ({
  apis: {
    [API_IDS.INNO_DATA]: {
      url: process.env.API_INNO_DATA_URL,
      tokenSecret: process.env.API_INNOVATION_JWT_PRIVATE_KEY,
      jwt: {
        issuer: process.env.API_INNOVATION_JWT_ISSUER,
        audience: process.env.API_INNOVATION_JWT_AUDIENCE,
        algorithm: 'HS256' as Algorithm,
      },
    },
    [API_IDS.UTRADE_SG]: {
      url: process.env.API_UTRADE_SG_URL,
      tokenSecret: process.env.API_UTRADE_SG_TOKEN_SECRET,
    },
    [API_IDS.UTRADE_HK]: {
      url: process.env.API_UTRADE_HK_URL,
      tokenSecret: process.env.API_UTRADE_HK_TOKEN_SECRET,
    },
    [API_IDS.UFUTURE]: {
      url: process.env.API_UFUTURE_URL,
      tokenSecret: process.env.API_UFUTURE_TOKEN_SECRET,
    },
  },
}));
