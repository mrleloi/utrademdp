@Controller('admin/auth')
export class AdminAuthController {
  constructor(private authService: AdminAuthService) {}

  @Post('login')
  async login(@Body() credentials: AdminLoginDto): Promise<{token: string}> {
    return this.authService.login(credentials);
  }

  @Get('me')
  @UseGuards(AdminAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}