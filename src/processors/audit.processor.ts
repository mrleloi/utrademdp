import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Processor('audit')
export class AuditProcessor {
  private readonly logger = new Logger(AuditProcessor.name);

  constructor(private readonly dbService: DatabaseService) {}

  @Process('log-access')
  async handleAuditLog(job: Job) {
    try {
      await this.dbService.saveAuditLog(job.data);
    } catch (error) {
      this.logger.error(`Error processing audit log: ${error.message}`);
      throw error; // Bull will handle retry based on queue configuration
    }
  }
}