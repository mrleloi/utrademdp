import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AppRoutes } from 'src/router/routes';
import { encrypt } from 'src/shared/helpers/encryption.helper';

@ApiTags(AppRoutes.encryption.tag)
@Controller(AppRoutes.encryption.tag)
export class EncryptionController {
  constructor() {}

  @Post()
  @ApiConsumes('text/plain')
  @ApiBody({
    description: 'plainText',
    type: String,
  })
  async encrypt(@Body() body: Buffer) {
    return encrypt(body.toString('utf-8'));
  }
}
