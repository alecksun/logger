// Just simple test by output to screen

const Logger = require('../');
let logger = new Logger('test');

logger.debug('message1', 'message2');

logger = logger.createLogger({ key: 'value' });
logger.info('message1', 'message2');

logger.module = 'test2';
logger.error('message1', 'message2');

logger.fatal('message1', 'message2');
console.log("should be normal");

logger = logger.createLogger({
    property1: {
        key1: 'value-1',
        key2: ['value-2', 'value-3']
    }
});
logger.info('Should be string');
logger.jsonFormat(true);
logger.info('Should be json');

logger = new Logger('test', Logger.LogLevels.WARN);
logger.error('should show');
logger.warn('should show');
logger.info('should hide');
