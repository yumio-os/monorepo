import { WinstonModule } from 'nest-winston';
import { format } from 'winston';

const winston = require('winston');

let newrelicFormatter, newrelicWinstonFormatter;
if (process.env.NEW_RELIC_APP_NAME && process.env.NEW_RELIC_LICENSE_KEY) {
  newrelicFormatter = require('@newrelic/winston-enricher');
  newrelicWinstonFormatter = newrelicFormatter(winston);
}

const util = require('util');

export function createWinstonLogger(logLevel = 'info', logDepth = 5) {
  const level = logLevel;

  const color = format.colorize({
    colors: {
      grey: 'grey',
    },
  });
  const winstonOptions = {
    exitOnError: false,
    level,
    logDepth,
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.printf((log) => {
        // object 'log' will be forwared to newrelic logging as a whole object
        // log.message - 1st argument
        // log.context - 2nd argument

        // save timestamp in ISO format because it will be overwritten in ms
        log.timestamp_ISO = log.timestamp;

        // relevant only for diplaying in console
        const timestampDisplay = color.colorize('grey', log.timestamp.slice(11));
        const levelDisplay = color.colorize(log.level, log.level);
        let messageDisplay = log.message ?? '';
        let contextDisplay = '';

        if (log.level === 'error') {
          messageDisplay = color.colorize(log.level, messageDisplay);
        }

        // log.context is 2nd argument passed in log, it can be string or context object
        if (log.context && typeof log.context === 'string') {
          // context is passed as string this happens as default behavior from Nest
          // -> use that string directly
          contextDisplay = log.context;

          // set as an object for consistency in newrelic
          log.context = {
            context: contextDisplay,
          };
        } else if (typeof log.context === 'object' && Object.keys(log.context)?.length > 0) {
          // context is passed as an object
          // -> extract optional 'context' string
          contextDisplay = log.context?.context ?? '';
        }

        // add color to context
        if (contextDisplay) contextDisplay = ` ${color.colorize('warn', contextDisplay)}`;

        if (log.level === 'verbose' && logLevel === 'info') {
          // skip verbose logs
          return '';
        }

        if (log.level === 'debug' && logLevel != 'debug') {
          // skip debug logs
          return '';
        }

        // log full detailed log object for 'verbose', 'debug' and 'error'
        const displayFullLog =
          log.level === 'verbose' ||
          log.level === 'error' ||
          log.level === 'debug' ||
          // in case case 1st argument was an object instead of string
          log.message === undefined ||
          // in case 'info' log has some data in 'context'
          (typeof log.context === 'object' && Object.keys(log.context)?.length > 1);

        let inspectLog;
        const logFromEntries = Object.fromEntries(Object.entries(log));

        inspectLog = util.inspect(logFromEntries, {
          showHidden: false,
          depth: displayFullLog ? 7 : 5, // ignore the log depth for now
          colors:
            process.env.ACTIVE_PROFILE == 'dev' || process.env.ACTIVE_PROFILE == 'local'
              ? true
              : false,
        });

        // log only simple one liner for 'info' logs
        // full log object will be forwarded to newrelic regardless
        if (process.env.ACTIVE_PROFILE == 'dev' || process.env.ACTIVE_PROFILE == 'local') {
          console.log(
            `${timestampDisplay} ${levelDisplay}${contextDisplay} - ${messageDisplay} ${
              inspectLog ? inspectLog : ''
            }`
          );
        } else if (process.env.ACTIVE_PROFILE == 'test') {
          console.log(`${messageDisplay} - ${inspectLog ? inspectLog : ''}`);
        } else {
          const logObject = {
            timestamp: log.timestamp_ISO || log.timestamp,
            level: log.level,
            message: log.message,
            context: inspectLog?.context ? inspectLog.context : log.context,
            // Include additional properties here
          };
          console.log(JSON.stringify(logObject));
        }

        // return empty string because we use default console.log directly
        return '';
        // return `${timestamp} ${level}${contextText} - ${messageText}`;
      }),

      // using Winstong and newrelic formatter to correctly forward logs to newrelic
      newrelicWinstonFormatter
        ? newrelicWinstonFormatter() // is optional, because it possibly can be not be initialized
        : format.printf((_) => '') // have to pass some dummy format function for it work
    ),
    transports: [
      // we don't use console transport because we directly use console.log
      new winston.transports.Console({ silent: true }),
    ],
  };

  //  Winston logger
  const logger = WinstonModule.createLogger(winstonOptions);

  return logger;
}
