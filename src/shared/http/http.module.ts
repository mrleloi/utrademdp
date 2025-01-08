import { Module } from '@nestjs/common';
import { HttpServices } from './http.services';

@Module({
  providers: [HttpServices],
  exports: [HttpServices],
})
export class HttpModule {}
