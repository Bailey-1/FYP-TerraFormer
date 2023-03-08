import log4js from 'log4js';

log4js.configure({
    appenders: {
        consoleOut: { type: 'stdout' },
    },
    categories: {
        default: {
            appenders: ['consoleOut'],
            level: 'info',
        },
    },
});

const logger = log4js.getLogger();

const info = (file: string, message: string, object?: object) => {
    if (object) {
        logger.info(`[${file}]:${message}`, object);
    } else {
        logger.info(`[${file}]:${message}`);
    }
};

const warn = (file: string, message: string, object?: object) => {
    if (object) {
        logger.warn(`[${file}]:${message}`, object);
    } else {
        logger.warn(`[${file}]:${message}`);
    }
};

const error = (file: string, message: string, object?: object) => {
    if (object) {
        logger.error(`[${file}]:${message}`, object);
    } else {
        logger.error(`[${file}]:${message}`);
    }
};

const debug = (file: string, message: string, object?: object) => {
    if (object) {
        logger.debug(`[${file}]:${message}`, object);
    } else {
        logger.debug(`[${file}]:${message}`);
    }
};

export default {
    info,
    warn,
    error,
    debug,
    log4js,
};
