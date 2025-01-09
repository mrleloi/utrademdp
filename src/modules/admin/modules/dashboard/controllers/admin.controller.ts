import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from '@modules/admin/guards/role.guard';
import { Roles } from '@modules/admin/decorators/roles.decorator';
import { Role } from '@shared/enums/role.enum';

@Controller('admin')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN, Role.STAFF)
export class AdminController {
  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard access' })
  @ApiResponse({
    status: 200,
    description: 'Dashboard information',
  })
  async getDashboard(@Request() req) {
    return {
      user: req.user,
    };
  }
}
