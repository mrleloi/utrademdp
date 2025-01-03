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
    kgiWatchlistEndpoint: `${[process.env.KGI_WATCHLIST_API_URL]}`.trim(),
    kgiBaseEndpoint: `${[process.env.KGI_BASE_URL]}`.trim(),
    kgiTrustEndpoint: `${[process.env.KGI_TRUST_URL]}`.trim(),
    marketApiEndpoint: `${[process.env.MARKET_API_URL]}`.trim(),
    timeout: 60000,
  },
  swagger: {
    enabled: process.env.SWAGGER_ENABLED || 'false',
    username: process.env.SWAGGER_USERNAME || 'kgi',
    password: process.env.SWAGGER_PASSWORD || 'kgi2024',
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
