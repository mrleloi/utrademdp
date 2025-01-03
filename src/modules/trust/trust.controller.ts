import { Body, Controller, Post, Scope } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppRoutes } from 'src/router/routes';
import { TrustService } from './trust.service';
import { ApiCommonOkResponse } from '@common/dtos/swagger.response';
import { GetTrustAccountsDto } from './dtos/request.dto';
import { GetTrustAccountsResponse } from './dtos/response.dto';

@ApiTags(AppRoutes.trust.tag)
@Controller({
  path: AppRoutes.trust.tag,
  scope: Scope.REQUEST,
})
export class TrustController {
  constructor(private readonly trustService: TrustService) {}

  @Post(AppRoutes.trust.accounts)
  @ApiOperation({
    summary:
      '使用Trust序號取回客戶已登入之帳號列表 [10103004- SSO Trust Check II]',
  })
  @ApiCommonOkResponse(GetTrustAccountsResponse)
  async getAccounts(@Body() getTrustAccountsDto: GetTrustAccountsDto) {
    return await this.trustService.getAccounts(getTrustAccountsDto);
  }
}
