import { MyLogger } from "./common/MyLogger"

const logger = MyLogger.create();
logger.debug("debug")
logger.info("info")
logger.warning("warning")
logger.error("error")
logger.critical("critical")