import { Injectable } from '@nestjs/common';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('audit') private auditQueue: Queue,
    @InjectQueue('token-refresh') private tokenQueue: Queue,
  ) {}

  async queueAuditLog(logData: any): Promise<void> {
    await this.auditQueue.add('log-access', logData, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000
      }
    });
  }

  async queueTokenRefresh(tokenData: any): Promise<void> {
    await this.tokenQueue.add('refresh-token', tokenData, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000
      }
    });
  }
}