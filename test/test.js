// Just simple test by output to screen

const Logger = require('../');
let logger = new Logger('test');

logger.debug('message1', 'message2');

logger = logger.createLogger({ key: 'value' });
logger.info('message1', 'message2');

logger.module = 'test2';
logger.error('message1', 'message2');


logger = new Logger('test', Logger.LogLevels.WARN);
logger.error('should show');
logger.warn('should show');
logger.info('should hide');
