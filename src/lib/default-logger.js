// @ts-nocheck
import { configuration } from 'configuration';
import { createLogger } from 'lib/logger';

export const logger = createLogger({ level: configuration.logLevel });
