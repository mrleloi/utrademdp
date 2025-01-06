import { Controller, Get, Res } from '@nestjs/common';
import { SwaggerService } from './swagger.service';
import { Response } from 'express';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('api-docs')
export class SwaggerController {
  constructor(private swaggerService: SwaggerService) {}

  @Get('innodata')
  getSwaggerDocs(@Res() res: Response) {
    const spec = this.swaggerService.getProxySpec();

    const fullSpec = {
      ...spec,
      openapi: '3.0.1',
      info: {
        ...spec.info,
        title: 'MDP Proxy - Inno Data API',
        version: '1.0.0',
        description: 'Proxy endpoints for Inno Data API'
      },
      servers: [
        { url: '/api/innodata' }
      ],
      paths: spec.paths || {},
      components: spec.components || {},
      tags: spec.tags || []
    };

    res.json(fullSpec);
  }
}