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
import { ApiUserPermissionsService } from '../services/api-user-permissions.service';
import { RolesGuard } from '@modules/admin/guards/role.guard';
import { Roles } from '@modules/admin/decorators/roles.decorator';
import { Role } from '@shared/enums/role.enum';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
} from '@modules/admin/modules/dashboard/dtos/api-user-permissions.dto';

@ApiTags('API User Permissions')
@Controller('admin/api-permissions')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN, Role.STAFF)
export class ApiUserPermissionsController {
  constructor(private permissionsService: ApiUserPermissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new permission' })
  async create(@Body() createDto: CreatePermissionDto) {
    return this.permissionsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all permissions' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({ name: 'groupId', required: false })
  @ApiQuery({ name: 'isActive', required: false })
  async findAll(
    @Query('userId') userId?: number,
    @Query('groupId') groupId?: number,
    @Query('isActive') isActive?: boolean,
  ) {
    return this.permissionsService.findAll({ userId, groupId, isActive });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get permission by id' })
  async findOne(@Param('id') id: number) {
    return this.permissionsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update permission' })
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(id, updateDto);
  }

  @Put(':id/toggle')
  @ApiOperation({ summary: 'Toggle permission status' })
  async toggleStatus(@Param('id') id: number) {
    return this.permissionsService.togglePermissionStatus(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete permission' })
  async remove(@Param('id') id: number) {
    return this.permissionsService.remove(id);
  }
}
