import { Logger, getLogger, configure, addLayout } from "log4js";

export class MyLogger {
  private logger: Logger;
  private constructor(fileName: string) {
    // TODO log4jsの設定はドキュメントを読む
    // log4js.configure({});
    // https://www.npmjs.com/package/log4js
    addLayout('json', (config) => (logEvent) => {
      return JSON.stringify({
        fileName: fileName,
        severity: logEvent.level.levelStr,
        message: this.formatMessage(logEvent.data),
        timestamp: logEvent.startTime
      }) + config.separator
    })
    configure({
      appenders: {
        out: {
          type: 'stdout', layout: {type : 'json', separator: ''}
        }
      },
      categories: {
        default: { 
          appenders: ['out'], level: 'all'
        }
      }
    })
    this.logger = getLogger();
  }

  private formatMessage(data: any[]) : string | undefined{
    if (!data || data.length === 0) {
      return undefined
    }
    let message = ''
    const separator = ', '
    for (let index = 0; index < data.length; index++) {
      if (data[index] instanceof Error) {
        const d = data[index]
        message += d.stack
      } else {
        message += data[index]
      }
      message += separator
    }
    return message.substring(0, message.length - separator.length)
  }

  public static create = (fileName: string) => new MyLogger(fileName);

  public debug = (message: string, ...args: any[]): void => {
    this.logger.debug(message, ...args);
  };

  public info = (message: string, ...args: any[]): void => {
    this.logger.info(message, ...args);
  };

  public warning = (message: string, ...args: any[]): void => {
    this.logger.warn(message, ...args);
  };

  public error = (message: string, ...args: any[]): void => {
    this.logger.error(message, ...args);
  };

  public critical = (message: string, ...args: any[]): void => {
    this.logger.fatal(message, ...args);
  };
}
