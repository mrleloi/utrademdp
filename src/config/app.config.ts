/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

export default {
  app: {
    name: 'Utrade MDP',
    description: 'Utrade MDP',
    version: '0.0.1',
    url: `${process.env.BASE_URL}`.trim() || 'http://localhost:3057/',
    apiPrefix: process.env.API_PREFIX || 'api',
  },
  http: {
    host: `${process.env.HOST || '0.0.0.0'}`.trim(),
    port: `${process.env.PORT || 3057}`.trim(),
  },
  axios: {
    timeout: 60000,
  },
  swagger: {
    enabled: process.env.SWAGGER_ENABLED || 'true',
    username: process.env.SWAGGER_USERNAME || 'utrademdp',
    password: process.env.SWAGGER_PASSWORD || 'utrademdp',
  },
  swaggerAPI: {
    enabledApiInnoData: process.env.SWAGGER_API_INNO_DATA_ENABLED || 'true',
    pathYamlApiInnoData:
      process.env.SWAGGER_API_INNO_DATA_PATH_YAML ||
      'src/yaml/api-innodata-swagger.yaml',
    enabledApiUtradeSG: process.env.SWAGGER_API_UTRADE_SG_ENABLED || 'true',
    pathYamlApiUtradeSG:
      process.env.SWAGGER_API_UTRADE_SG_PATH_YAML ||
      'src/yaml/api-utrade-sg-swagger.yaml',
    enabledApiUtradeHK: process.env.SWAGGER_API_UTRADE_HK_ENABLED || 'true',
    pathYamlApiUtradeHK:
      process.env.SWAGGER_API_UTRADE_HK_PATH_YAML ||
      'src/yaml/api-utrade-hk-swagger.yaml',
    enabledApiUfuture: process.env.SWAGGER_API_UFUTURE_ENABLED || 'true',
    pathYamlApiUfuture:
      process.env.SWAGGER_API_UFUTURE_PATH_YAML ||
      'src/yaml/api-ufuture-swagger.yaml',
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
