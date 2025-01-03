import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as cron from 'node-cron';
import appConfig from '@config/app.config';
import { AppConstant } from 'src/shared/constants/app.constants';
const { combine, timestamp, align, printf } = winston.format;

@Injectable()
export class LoggerService {
  private infoLogger: winston.Logger;
  private errorLogger: winston.Logger;
  private fileInfoName: string = 'traderapp';
  private fileErrorName: string = 'error';
  private logPath: string;
  private logLevel: string;

  constructor() {
    this.logPath = appConfig.logs.path;
    this.logLevel = appConfig.logs.level;
    this.initInfoLogger();
    this.initErrorLogger();
  }

  private initInfoLogger() {
    const infoTransport = new DailyRotateFile({
      level: 'info',
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        align(),
        printf(
          (info) =>
            `[${info.timestamp}]${info?.message} ${JSON.stringify(info?.meta)}`,
        ),
      ),
      filename: `${this.logPath}/info/${this.fileInfoName}_%DATE%_${
        process.env.clusterId ?? 0
      }.log`,
      datePattern: 'YYYYMMDD',
      watchLog: true,
      handleRejections: true,
      zippedArchive: true,
    });

    this.infoLogger = winston.createLogger({
      level: 'info',
      transports: [infoTransport],
    });
  }

  private initErrorLogger() {
    const errorTransport = new DailyRotateFile({
      level: 'error',
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        align(),
        printf(
          (info) =>
            `[${info.timestamp}] ${info.level}: ${
              info.message
            } ${JSON.stringify(info?.meta)}`,
        ),
      ),
      filename: `${this.logPath}/error/${this.fileErrorName}_%DATE%_${
        process.env.clusterId ?? 0
      }.log`,
      datePattern: 'YYYYMMDD',
      watchLog: true,
      handleRejections: true,
      zippedArchive: true,
    });

    this.errorLogger = winston.createLogger({
      level: 'error',
      transports: [errorTransport],
    });
  }

  public log(url: string, message: string, meta?: any) {
    if (this.logCondition(url.substring(appConfig.app.apiPrefix.length + 2))) {
      this.infoLogger.info(message, { meta });
    }
  }

  public error(url: string, message: string, meta?: any) {
    if (this.logCondition(url.substring(appConfig.app.apiPrefix.length + 2))) {
      this.errorLogger.error(message, { meta });
    }
  }

  private logCondition(url: any) {
    if (
      this.logLevel != AppConstant.LogLevel.FULL ||
      AppConstant.RoutesLogLevel.IGNORE.includes(url)
    ) {
      return false;
    }
    return true;
  }

  public closePreviousLogs() {
    cron.schedule('0 0 * * *', () => {
      this.log('', new Date().toISOString(), { response: { responseCode: 0 } });
      this.error('', new Date().toISOString());
    });
  }
}
