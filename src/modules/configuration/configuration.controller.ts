import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppRoutes } from 'src/router/routes';
import { ConfigurationService } from './configuration.service';
import { ApiCommonOkResponse } from '@common/dtos/swagger.response';
import { ConfigurationResponse } from './entities/response.dto';

@ApiTags(AppRoutes.configuration.tag)
@Controller({ path: AppRoutes.configuration.tag })
export class ConfigurationController {
  constructor(private readonly configService: ConfigurationService) {}

  @Get()
  @ApiOperation({ summary: 'Get periodic query config' })
  @ApiCommonOkResponse([ConfigurationResponse])
  async GetConfiguration() {
    return await this.configService.find();
  }
}
