import { MyLogger } from "./common/MyLogger"

const logger = MyLogger.create();
logger.debug("debug", "debug args")
logger.info("info", "info args")
logger.warning("warning", "warning args")
logger.error("error", new Error("sample error"))
logger.critical("critical", new Error("sample critical error"))