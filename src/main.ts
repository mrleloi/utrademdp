import { SwaggerAnalyzerService } from '@modules/api-gateway-docs/swagger-analyzer.service';

process.env.TZ = 'Asia/Singapore';

import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppClusterService } from './app_cluster.service';
import { commonDecorators } from '@decorators/common.decoratos';
import config from '@config/app.config';
import * as bodyParser from 'body-parser';
import { SwaggerService } from '@modules/api-gateway-docs/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);
  initializeApp(app);

  try {
    initializeSwaggerAndDatabase(app);

    // 3. Initialize swagger UI endpoints
    initializeAppSwagger(app);
    initializeApiInnoDataSwagger(app);
    initializeApiUfutureSwagger(app);

    // 4. Start server
    await app.listen(config.http.port);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('Error during application initialization:', error);
    process.exit(1);
  }
}

async function initializeApp(app: INestApplication) {
  // 1. Basic app configuration
  app.enableCors({
    exposedHeaders: config.cors,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );
  app.use(bodyParser.raw({ type: 'text/plain' }));
  app.getHttpAdapter().getInstance().disable('x-powered-by');
}

async function initializeSwaggerAndDatabase(app: INestApplication) {
  const swaggerAnalyzer = app.get(SwaggerAnalyzerService);
  const swaggerService = app.get(SwaggerService);

  console.log('Starting API specs analysis...');

  const swaggerTasks = [];

  if (config.swaggerAPI.enabledApiInnoData === 'true') {
    swaggerTasks.push(
      Promise.resolve().then(async () => {
        console.log('Analyzing Inno Data API swagger...');
        const spec = swaggerService.loadSpec(
          config.swaggerAPI.pathYamlApiInnoData,
          'INNO_DATA',
        );
        await swaggerAnalyzer.analyzeAndSaveApiSpec(spec, 'INNO_DATA');
        console.log('Finished analyzing Inno Data API swagger');
      }),
    );
  }

  if (config.swaggerAPI.enabledApiUtradeSG === 'true') {
    swaggerTasks.push(
      Promise.resolve().then(async () => {
        console.log('Analyzing UTrade SG API swagger...');
        const spec = swaggerService.loadSpec(
          config.swaggerAPI.pathYamlApiUtradeSG,
          'UTRADE_SG',
        );
        await swaggerAnalyzer.analyzeAndSaveApiSpec(spec, 'UTRADE_SG');
        console.log('Finished analyzing UTrade SG API swagger');
      }),
    );
  }

  await Promise.all(swaggerTasks);
  console.log('All API specs analyzed and saved to database successfully');
}

function initializeAppSwagger(app: INestApplication) {
  if (config.swagger.enabled !== 'true') {
    return;
  }

  const serviceName = config.app.name;
  const serviceDescription = config.app.description;
  const apiVersion = config.app.version;
  const baseUrl = config.app.url;

  const options = new DocumentBuilder()
    .setTitle(`${serviceName} API spec`)
    .setDescription(serviceDescription)
    .addBearerAuth()
    .setVersion(apiVersion)
    .addServer(baseUrl)
    .addApiKey(
      { scheme: 'apikey', type: 'apiKey', in: 'header', name: 'x-api-key' },
      'apikey',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  Object.keys(document.paths).forEach((path) => {
    setDefaultResponses(document, path, commonDecorators);
  });
  writeSwaggerJson(`${process.cwd()}`, document);
  SwaggerModule.setup(`/docs`, app, document, {
    swaggerOptions: {
      displayOperationId: true,
    },
  });
}

const writeSwaggerJson = (path: string, document) => {
  const swaggerFile = `${path}/swagger.json`;
  fs.writeFileSync(swaggerFile, JSON.stringify(document, null, 2), {
    encoding: 'utf8',
  });
};

function setDefaultResponses(
  document: OpenAPIObject,
  path: string,
  responses: any,
) {
  const methods = ['get', 'post', 'put', 'patch', 'delete'];
  if (!document.paths[path]) return;

  methods.forEach((method) => {
    if (document.paths[path][method]) {
      document.paths[path][method].responses = {
        ...responses,
        ...document.paths[path][method].responses,
      };
    }
  });
}

function initializeApiInnoDataSwagger(app: INestApplication) {
  if (config.swaggerAPI.enabledApiInnoData !== 'true') {
    return;
  }

  const serviceName = config.app.name;
  const serviceDescription = config.app.description;
  const apiVersion = config.app.version;
  const baseUrl = config.app.url;

  const options = new DocumentBuilder()
    .setTitle(`${serviceName} API spec`)
    .setDescription(serviceDescription)
    .addBearerAuth()
    .setVersion(apiVersion)
    .addServer(baseUrl)
    .addApiKey(
      { scheme: 'apikey', type: 'apiKey', in: 'header', name: 'x-api-key' },
      'apikey',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/docs/innodata', app, document, {
    swaggerOptions: {
      displayOperationId: true,
      urls: [
        {
          url: '/api-gateway-docs/innodata',
          name: 'Inno Data API',
        },
      ],
    },
    customSiteTitle: 'MDP API Docs - Inno-data',
  });
}

function initializeApiUfutureSwagger(app: INestApplication) {
  if (config.swaggerAPI.enabledApiUfuture !== 'true') {
    return;
  }

  const serviceName = config.app.name;
  const serviceDescription = config.app.description;
  const apiVersion = config.app.version;
  const baseUrl = config.app.url;

  const options = new DocumentBuilder()
    .setTitle(`${serviceName} API spec`)
    .setDescription(serviceDescription)
    .addBearerAuth()
    .setVersion(apiVersion)
    .addServer(baseUrl)
    .addApiKey(
      { scheme: 'apikey', type: 'apiKey', in: 'header', name: 'x-api-key' },
      'apikey',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/docs/ufuture', app, document, {
    swaggerOptions: {
      displayOperationId: true,
      urls: [
        {
          url: '/api-gateway-docs/ufuture/',
          name: 'Ufuture API',
        },
      ],
    },
    customSiteTitle: 'MDP API Docs - Ufuture API',
  });
}

AppClusterService.clusterize(bootstrap);
