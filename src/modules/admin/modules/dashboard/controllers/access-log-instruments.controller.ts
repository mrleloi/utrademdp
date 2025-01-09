import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AccessLogInstrumentsService } from '../services/access-log-instruments.service';
import { RolesGuard } from '@modules/admin/guards/role.guard';
import { Roles } from '@modules/admin/decorators/roles.decorator';
import { Role } from '@shared/enums/role.enum';
import { ApiUser } from '../../../../../database/entities/api_users.entity';

@ApiTags('Access Log Instruments')
@Controller('admin/access-log-instruments')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN, Role.STAFF)
export class AccessLogInstrumentsController {
  constructor(private instrumentsService: AccessLogInstrumentsService) {}

  @Get('usage-by-type')
  @ApiOperation({ summary: 'Get instrument usage statistics by type' })
  @ApiQuery({ name: 'apiUser', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  async getUsageByType(
    @Query('apiUser') apiUser?: ApiUser,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.instrumentsService.getInstrumentUsageByType({
      apiUserId: apiUser.id,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    });
  }
}
