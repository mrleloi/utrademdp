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
import { InstrumentTypesService } from '../services/instrument-types.service';
import {
  CreateInstrumentTypeDto,
  InstrumentTypeResponseDto,
  UpdateInstrumentTypeDto,
} from '@modules/admin/modules/dashboard/dtos/instrument-type.dto';
import { RolesGuard } from '@modules/admin/guards/role.guard';
import { Roles } from '@modules/admin/decorators/roles.decorator';
import { Role } from '@shared/enums/role.enum';

@ApiTags('Instrument Types')
@Controller('admin/instrument-types')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN, Role.STAFF)
export class InstrumentTypesController {
  constructor(private typesService: InstrumentTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Create new instrument type' })
  @ApiResponse({ status: 201, type: InstrumentTypeResponseDto })
  async create(@Body() createDto: CreateInstrumentTypeDto) {
    return this.typesService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all instrument types' })
  @ApiResponse({ status: 200, type: [InstrumentTypeResponseDto] })
  async findAll() {
    return this.typesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get instrument type by id' })
  @ApiResponse({ status: 200, type: InstrumentTypeResponseDto })
  async findOne(@Param('id') id: number) {
    return this.typesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update instrument type' })
  @ApiResponse({ status: 200, type: InstrumentTypeResponseDto })
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateInstrumentTypeDto,
  ) {
    return this.typesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete instrument type' })
  async remove(@Param('id') id: number) {
    return this.typesService.remove(id);
  }

  @Get(':id/statistics')
  @ApiOperation({ summary: 'Get instrument type usage statistics' })
  async getStatistics(@Param('id') id: number) {
    return this.typesService.getTypeUsageStatistics(id);
  }
}
