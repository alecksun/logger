'use strict';

const LevelNames = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];
const LogLevels = {};

LevelNames.forEach((level, index) => {
  LogLevels[level] = index;
});


const formatMessage = (message) => {
  // Make it a string
  let result = '';
  Object.keys(message).forEach(key => {
    if (key !== 'message') {
      result += `[${key}=${message[key]}] `;
    }
  });
  result += message.message;
  return result;
}

const getMessage = (properties, message) => {
  const m = Object.assign({}, properties, { message });
  const strMessage = formatMessage(m);
  return strMessage;
}



class Logger {
  constructor(module = '', level = LogLevels.DEBUG) {
    this.module = module;
    this.level = level;
    this.properties = {};

    LevelNames.forEach(level => {
      this[level.toLowerCase()] = (...args) => {
        return this.log(level, ...args);
      };
    });
  }

  createLogger(properties) {
    const logger = new Logger(this.module, this.level);
    logger.properties = Object.assign({}, this.properties, properties);
    return logger;
  }

  getLoggerFunc(level) {
    return (...args) => {
      this.log(level, ...args);
    }
  }

  log(level, ...args) {
    if (LogLevels[level] >= this.level) {
      const date = new Date();
      const message = `${date.toISOString()} - [${level}]: [${this.module}] ${getMessage(this.properties, args.join(' '))}`;
      console.log(message);
    }
  }

  // debug(...args) {
  //   return this.log('DEBUG', ...args);
  // }

  // info(...args) {
  //   return this.log('INFO', ...args);
  // }

  // warn(...args) {
  //   return this.log('WARN', ...args);
  // }

  // error(...args) {
  //   return this.log('ERROR', ...args);
  // }

  // fatal(...args) {
  //   return this.log('FATAL', ...args);
  // }
};

Logger.LogLevels = LogLevels;



module.exports = Logger;


