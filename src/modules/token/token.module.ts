import { Module } from '@nestjs/common';
import { InnoTokenController } from './controllers/inno-token.controller';
import { UtradeTokenController } from './controllers/utrade-token.controller';
import { UFutureTokenController } from './controllers/ufuture-token.controller';
import { TokenDecoderService } from './services/token-decoder.service';
import { TokenEncoderService } from './services/token-encoder.service';
import { HttpModule } from '@shared/http/http.module';

@Module({
  imports: [HttpModule],
  controllers: [
    InnoTokenController,
    UtradeTokenController,
    UFutureTokenController,
  ],
  providers: [TokenDecoderService, TokenEncoderService],
  exports: [TokenDecoderService, TokenEncoderService],
})
export class TokenModule {}