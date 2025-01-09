/*
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
import { InstrumentsService } from '@modules/admin/modules/dashboard/services/instrument.service';
import { JwtAuthGuard } from '@modules/admin/guards/jwt-auth.guard';
import {
  CreateInstrumentDto,
  UpdateInstrumentDto,
} from '@modules/admin/modules/dashboard/dtos/instrument.dto';

@ApiTags('Instruments')
@Controller('admin/instruments')
@UseGuards(JwtAuthGuard)
export class InstrumentsController {
  constructor(private instrumentsService: InstrumentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new instrument' })
  async create(@Body() createDto: CreateInstrumentDto) {
    return this.instrumentsService.create(createDto);
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Create multiple instruments' })
  async bulkCreate(@Body() instruments: CreateInstrumentDto[]) {
    return this.instrumentsService.bulkCreate(instruments);
  }

  @Get()
  @ApiOperation({ summary: 'Get all instruments' })
  @ApiQuery({ name: 'typeId', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('typeId') typeId?: number,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.instrumentsService.findAll({ typeId, search, page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get instrument by id' })
  async findOne(@Param('id') id: number) {
    return this.instrumentsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update instrument' })
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateInstrumentDto,
  ) {
    return this.instrumentsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete instrument' })
  async remove(@Param('id') id: number) {
    return this.instrumentsService.remove(id);
  }
}
*/
