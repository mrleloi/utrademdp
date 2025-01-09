import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AccessLogsService } from '../services/access-logs.service';
import { RolesGuard } from '@modules/admin/guards/role.guard';
import { Roles } from '@modules/admin/decorators/roles.decorator';
import { Role } from '@shared/enums/role.enum';

@ApiTags('Access Logs')
@Controller('admin/access-logs')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN, Role.STAFF)
export class AccessLogsController {
  constructor(private logsService: AccessLogsService) {}
  @Get()
  @ApiOperation({ summary: 'Get access logs with filtering and pagination' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({ name: 'endpointId', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('userId') userId?: number,
    @Query('endpointId') endpointId?: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('status') status?: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.logsService.findAll({
      userId,
      endpointId,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      status,
      page,
      limit,
    });
  }

  @Get('error-stats')
  @ApiOperation({ summary: 'Get error statistics' })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  async getErrorStats(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.logsService.getErrorStats({
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    });
  }
}
