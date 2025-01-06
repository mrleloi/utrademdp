@ApiTags(ApiRoutes.token.tag)
@Controller(`${ApiRoutes.token.tag}/inno-data`)
export class InnoTokenController {
  constructor(
    private readonly tokenDecoderService: TokenDecoderService,
    private readonly tokenEncoderService: TokenEncoderService,
  ) {}

  @Post(ApiRoutes.token.paths.decode)
  async decodeToken(@Body() request: TokenRequestDto) {
    return this.tokenDecoderService.decodeInnoDataToken(request.token);
  }
}