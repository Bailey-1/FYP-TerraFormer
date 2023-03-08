import { app } from './app';
import { logger } from '@bailey-1/terraformwebapp-common';

const start = async () => {
    logger.info('index.ts', 'Starting Server');
    app.listen(8080, () => {
        logger.info('index.ts', 'Server started');
    });
};

start();
