import { Module } from '@nestjs/common';
import { EncryptionController } from './encryption.controller';

@Module({
  controllers: [EncryptionController],
})
export class EncryptionModule {}
