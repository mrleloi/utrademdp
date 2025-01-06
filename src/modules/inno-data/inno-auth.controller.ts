@Controller('inno-data/auth')
export class InnoAuthController {
  constructor(private authService: InnoAuthService) {}

  @Post('token')
  async getToken(@Body() credentials: InnoAuthDto) {
    const startTime = Date.now();
    const token = await this.authService.authenticate(credentials);

    // Log access
    await this.auditService.logApiAccess({
      userId: credentials.username,
      apiGroup: 'INNO_DATA',
      apiEndpoint: '/auth/token',
      instrumentInfo: {},
      requestParams: credentials,
      responseStatus: 200,
      responseTime: Date.now() - startTime
    });

    return token;
  }
}