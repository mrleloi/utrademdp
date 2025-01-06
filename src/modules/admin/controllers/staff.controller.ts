@Controller('admin/staff')
@UseGuards(AdminAuthGuard)
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Get('dashboard')
  @Roles('admin', 'operator')
  async getDashboard() {
    return this.staffService.getDashboardData();
  }

  @Post('clients/:clientId/permissions')
  @Roles('admin')
  async updateClientPermissions(
    @Param('clientId') clientId: string,
    @Body() permissions: any
  ) {
    return this.staffService.updateClientPermissions(clientId, permissions);
  }

  @Get('audit')
  @Roles('admin', 'operator', 'viewer')
  async getAuditData(
    @Query() query: AuditQueryDto
  ) {
    return this.staffService.getAuditData(query);
  }
}