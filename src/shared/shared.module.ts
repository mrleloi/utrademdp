import { Global, Module } from '@nestjs/common';
import { HttpServices } from './http/http-services';

@Global()
@Module({
  providers: [HttpServices],
  exports: [HttpServices],
})
export class SharedModule {}
