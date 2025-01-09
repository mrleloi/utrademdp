import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { RolesGuard } from '@modules/admin/guards/role.guard';
import { Roles } from '@modules/admin/decorators/roles.decorator';
import { Role } from '@shared/enums/role.enum';
import {
  CreateApiUserDto,
  UpdateApiUserDto,
} from '@modules/admin/modules/dashboard/dtos/api-user.dto';
import { ApiUserService } from '@modules/admin/modules/dashboard/services/api-user.service';

@ApiTags('API Users')
@Controller('admin/api-users')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN, Role.STAFF)
export class ApiUsersController {
  constructor(private apiUsersService: ApiUserService) {}

  @Post()
  @ApiOperation({ summary: 'Create new API user' })
  async create(@Body() createDto: CreateApiUserDto) {
    return this.apiUsersService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all API users' })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('status') status?: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.apiUsersService.findAll({ status, search, page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get API user by id' })
  async findOne(@Param('id') id: number) {
    return this.apiUsersService.findOne(id);
  }

  @Get(':id/statistics')
  @ApiOperation({ summary: 'Get API user statistics' })
  async getUserStatistics(@Param('id') id: number) {
    return this.apiUsersService.getUserStatistics(id);
  }

  @Get(':id/access-history')
  @ApiOperation({ summary: 'Get API user access history' })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getUserAccessHistory(
    @Param('id') id: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.apiUsersService.getUserAccessHistory(id, {
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      page,
      limit,
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update API user' })
  async update(@Param('id') id: number, @Body() updateDto: UpdateApiUserDto) {
    return this.apiUsersService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete API user' })
  async remove(@Param('id') id: number) {
    return this.apiUsersService.remove(id);
  }
}
