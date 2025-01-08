import { Module } from '@nestjs/common';
import { SwaggerController } from './swagger.controller';
import { SwaggerService } from './swagger.service';
import { SwaggerAnalyzerService } from '@modules/api-gateway-docs/swagger-analyzer.service';
import { ApiGatewayDatabaseModule } from '../../database/api-gateway.database';
import { PermissionService } from '@modules/api-gateway/services/permission.service';

@Module({
  imports: [ApiGatewayDatabaseModule],
  controllers: [SwaggerController],
  providers: [SwaggerService, SwaggerAnalyzerService, PermissionService],
})
export class SwaggerAPIModule {}
