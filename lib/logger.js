'use strict';
const chalk = require('chalk');

const LevelNames = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];
const LogLevels = {};

LevelNames.forEach((level, index) => {
  LogLevels[level] = index;
});


const formatMessage = (message) => {
  // Make it a string
  let result = '';
  Object.keys(message).forEach(key => {
    if (key !== '__MESSAGE__') {
      let value = message[key];
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      result += `[${key}=${value}] `;
    }
  });
  result += message.__MESSAGE__;
  return result;
}

const getMessage = (properties, message) => {
  const m = Object.assign({}, properties, { 
    __MESSAGE__: message
  });
  const strMessage = formatMessage(m);
  return strMessage;
}

const style = {
    'DEBUG': chalk.white,
    'INFO': chalk.blueBright,
    'WARN': chalk.yellow,
    'ERROR': chalk.red,
    'FATAL': chalk.white.bgRed
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

  jsonFormat(enable) {
    if (enable) {
      this._jsonFormat = true;
    }
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

      let message;
      if (this._jsonFormat) {
        message = JSON.stringify({
          module: this.module,
          ...this.properties,
          message: args.join(' ')
        }, null, 2);
      } else {
        message = `[${this.module}] ${getMessage(this.properties, args.join(' '))}`;
      }
      message = `${date.toISOString()} - [${level}]: ${message}`;
      console.log(style[level](message));
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


