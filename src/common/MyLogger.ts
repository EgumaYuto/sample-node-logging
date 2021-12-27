import { Logger, getLogger } from "log4js";

export class MyLogger {
  private logger: Logger;
  private constructor() {
    // TODO log4jsの設定はドキュメントを読む
    // log4js.configure({});
    // https://www.npmjs.com/package/log4js
    this.logger = getLogger();
  }

  public static create = () => new MyLogger();

  public debug = (message: any, ...args: any[]): void => {
    this.logger.debug(message, ...args);
  };

  public info = (message: any, ...args: any[]): void => {
    this.logger.info(message, ...args);
  };

  public warning = (message: any, ...args: any[]): void => {
    this.logger.warn(message, ...args);
  };

  public error = (message: any, ...args: any[]): void => {
    this.logger.error(message, ...args);
  };

  public critical = (message: any, ...args: any[]): void => {
    this.logger.fatal(message, ...args);
  };
}
