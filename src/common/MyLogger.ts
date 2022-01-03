import { Logger, getLogger, configure, addLayout, LoggingEvent } from "log4js";

interface LogPayload {
  fileName: string
  severity: string
  message: string
  timestamp: Date
}

export class MyLogger {
  private logger: Logger;
  private constructor(fileName: string) {
    addLayout('json', (config) => (logEvent) => {
      return JSON.stringify(this.buildPayload(fileName, logEvent)) + config.separator
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

  /**
   * ログ出力するペイロードを組み立てる
   * 
   * @param fileName ファイル名
   * @param logEvent ログイベント
   * @returns ログ出力するペイロード
   */
  private buildPayload(fileName: string, logEvent: LoggingEvent) : LogPayload {
    return {
      fileName: fileName,
      severity: logEvent.level.levelStr,
      message: this.formatMessage(logEvent.data),
      timestamp: logEvent.startTime
    }
  }

  /**
   * 渡されたメッセージのタイプごとに、出力を調整する
   * 
   * @param data 
   * @returns formated message
   */
  private formatMessage(data: any[]) : string {
    if (!data || data.length === 0) {
      return ''
    }
    let message = ''
    const separator = ', '
    for (let index = 0; index < data.length; index++) {
      const d = data[index]
      if (d instanceof Error) {
        message += d.stack
      } else if (typeof d === 'string') {
        message += d
      } else {
        message += JSON.stringify(d)
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
