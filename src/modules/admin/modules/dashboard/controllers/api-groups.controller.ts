import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiGroupsService } from '../services/api-groups.service';
import { RolesGuard } from '@modules/admin/guards/role.guard';
import { Roles } from '@modules/admin/decorators/roles.decorator';
import { Role } from '@shared/enums/role.enum';
import {
  CreateGroupDto,
  GroupResponseDto,
  UpdateGroupDto,
} from '@modules/admin/modules/dashboard/dtos/api-group.dto';

@ApiTags('API Groups')
@Controller('admin/api-groups')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN, Role.STAFF)
export class ApiGroupsController {
  constructor(private groupsService: ApiGroupsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new API group' })
  @ApiResponse({ status: 201, type: GroupResponseDto })
  async create(@Body() createDto: CreateGroupDto) {
    return this.groupsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all API groups' })
  @ApiResponse({ status: 200, type: [GroupResponseDto] })
  async findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get API group by id' })
  @ApiResponse({ status: 200, type: GroupResponseDto })
  async findOne(@Param('id') id: number) {
    return this.groupsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update API group' })
  @ApiResponse({ status: 200, type: GroupResponseDto })
  async update(@Param('id') id: number, @Body() updateDto: UpdateGroupDto) {
    return this.groupsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete API group' })
  async remove(@Param('id') id: number) {
    return this.groupsService.remove(id);
  }

  @Get(':id/statistics')
  @ApiOperation({ summary: 'Get API group usage statistics' })
  async getStatistics(@Param('id') id: number) {
    return this.groupsService.getGroupStatistics(id);
  }
}
