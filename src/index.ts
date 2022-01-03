import {MyLogger} from "./common/MyLogger";

const logger = MyLogger.create("index.ts");
logger.debug("debug message", "debug args");
logger.info("info message", "info args");
logger.warning("warning message", "warning args");
logger.error("error message", new Error("sample error"));
logger.critical("critical message", new Error("sample critical error"));
