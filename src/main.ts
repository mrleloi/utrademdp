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

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);
  initializeApp(app);
  initializeAppSwagger(app);
  initializeApiInnoDataSwagger(app);
}

async function initializeApp(app: INestApplication) {
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
  await app.listen(config.http.port);
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
          url: '/api-docs/innodata',
          name: 'Inno Data API',
        },
      ],
    },
    customSiteTitle: 'MDP API Docs - Inno-data',
  });
}

AppClusterService.clusterize(bootstrap);
