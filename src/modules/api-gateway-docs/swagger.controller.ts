import { Controller, Get, Res } from '@nestjs/common';
import { SwaggerService } from './swagger.service';
import { Response } from 'express';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('api-gateway-docs')
export class SwaggerController {
  constructor(private swaggerService: SwaggerService) {}

  @Get('innodata')
  async getInnoDataSwaggerDocs(@Res() res: Response) {
    const spec = this.swaggerService.getSpec('INNO_DATA');

    const fullSpec = {
      ...spec,
      openapi: '3.0.1',
      info: {
        ...spec.info,
        title: 'MDP Proxy - Inno Data API',
        version: '1.0.0',
        description: 'Proxy endpoints for Inno Data API',
      },
      servers: [{ url: '/api-gateway/innodata' }],
      paths: spec.paths || {},
      components: spec.components || {},
      tags: spec.tags || [],
    };

    res.json(fullSpec);
  }

  @Get('utrade-sg')
  async getUtradeSgSwaggerDocs(@Res() res: Response) {
    const spec = this.swaggerService.getSpec('UTRADE_SG');

    const fullSpec = {
      ...spec,
      openapi: '3.0.1',
      info: {
        ...spec.info,
        title: 'MDP Proxy - UTrade SG API',
        version: '1.0.0',
        description: 'Proxy endpoints for UTrade SG API',
      },
      servers: [{ url: '/api-gateway/utrade-sg' }],
      paths: spec.paths || {},
      components: spec.components || {},
      tags: spec.tags || [],
    };

    res.json(fullSpec);
  }

  @Get('utrade-hk')
  async getUtradeHkSwaggerDocs(@Res() res: Response) {
    const spec = this.swaggerService.getSpec('UTRADE_HK');

    const fullSpec = {
      ...spec,
      openapi: '3.0.1',
      info: {
        ...spec.info,
        title: 'MDP Proxy - UTrade HK API',
        version: '1.0.0',
        description: 'Proxy endpoints for UTrade HK API',
      },
      servers: [{ url: '/api-gateway/utrade-hk' }],
      paths: spec.paths || {},
      components: spec.components || {},
      tags: spec.tags || [],
    };

    res.json(fullSpec);
  }

  @Get('ufuture')
  async getUfutureSwaggerDocs(@Res() res: Response) {
    const spec = this.swaggerService.getSpec('UFUTURE');

    const fullSpec = {
      ...spec,
      openapi: '3.0.1',
      info: {
        ...spec.info,
        title: 'MDP Proxy - UFuture API',
        version: '1.0.0',
        description: 'Proxy endpoints for UFuture API',
      },
      servers: [{ url: '/api-gateway/ufuture' }],
      paths: spec.paths || {},
      components: spec.components || {},
      tags: spec.tags || [],
    };

    res.json(fullSpec);
  }
}
