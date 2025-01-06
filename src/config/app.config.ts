/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

export default {
  app: {
    name: 'KGI Securities',
    description: 'Internal APIs for KGI',
    version: '0.0.1',
    url: `${process.env.BASE_URL}`.trim() || 'http://localhost:3057/',
    apiPrefix: process.env.API_PREFIX || 'apikgitrader',
  },
  http: {
    host: `${process.env.HOST || '0.0.0.0'}`.trim(),
    port: `${process.env.PORT || 3057}`.trim(),
  },
  axios: {
    innoDataEndpoint: `${[process.env.INNO_DATA_API_URL]}`.trim(),
    utradeSgEndpoint: `${[process.env.UTRADE_SG_API_URL]}`.trim(),
    utradeHkEndpoint: `${[process.env.UTRADE_HK_API_URL]}`.trim(),
    ufutureEndpoint: `${[process.env.UFUTURE_API_URL]}`.trim(),
    timeout: 60000,
  },
  swagger: {
    enabled: process.env.SWAGGER_ENABLED || 'true',
    username: process.env.SWAGGER_USERNAME || 'kgi',
    password: process.env.SWAGGER_PASSWORD || 'kgi2024',
  },
  swaggerAPI: {
    enabledApiInnoData: process.env.SWAGGER_API_INNO_DATA_ENABLED || 'true',
    enabledApiUtradeSG: process.env.SWAGGER_API_UTRADE_SG_ENABLED || 'true',
    enabledApiUtradeHK: process.env.SWAGGER_API_UTRADE_HK_ENABLED || 'true',
    enabledApiUfuture: process.env.SWAGGER_API_UFUTURE_ENABLED || 'true',
  },
  logs: {
    path: process.env.LOG_PATH || './logs',
    level: process.env.LOG_LEVEL || '1',
  },
  cors: '*',
  clusters: process.env.NUMBER_OF_CLUSTERS || '0',
  encryption: {
    key: process.env.ENCRYPTION_KEY,
  },
};
