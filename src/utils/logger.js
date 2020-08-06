'use strict'

// thx zaseth ily <3

const { createLogger, transports, format, addColors } = require('winston')
const { combine, colorize, timestamp, json, printf } = format

require('winston-daily-rotate-file')
addColors({
  incoming: 'bold white cyanBG',
  outgoing: 'bold white yellowBG',
  extension: 'bold magenta blackBG'
})

/**
 * @description The text formatter
 * @param {String} level
 * @param {String} message
 * @param {String} timestamp
 * @returns {String}
 */
const textFormat = printf(({ level, message, timestamp }) => {
  return `[\x1b[36m${timestamp}\x1b[0m] [${level}] \x1b[35m>\x1b[0m ${message}`
})

/**
 * @description The JSON formatter
 * @param {String} level
 * @param {Object} message
 * @param {String} timestamp
 * @returns {String}
 */
const jsonFormat = printf(({ level, message, timestamp }) => {
  return `[\x1b[36m${timestamp}\x1b[0m] [${level}] \x1b[35m>\x1b[0m ${JSON.stringify(message, null, 4)}`
})

/**
 * @description The debug logger
 * @type {winston.Logger}
 */
const { debug } = createLogger({
  levels: { debug: 7 },
  transports: [
    new transports.DailyRotateFile({
      level: 'debug',
      maxFiles: '1d',
      filename: `./logs/${process.argv[2]}/debug@%DATE%.log`,
      datePattern: 'D-M-YYYY',
      format: combine(timestamp({ format: 'HH:mm:ss' }), json())
    }),
    new transports.Console({
      level: 'debug',
      format: combine(colorize(), timestamp({ format: 'HH:mm:ss' }), textFormat)
    })
  ]
})

/**
 * @description The info logger
 * @type {winston.Logger}
 */
const { info } = createLogger({
  levels: { info: 6 },
  transports: [
    new transports.DailyRotateFile({
      level: 'info',
      maxFiles: '2d',
      filename: `./logs/${process.argv[2]}/info@%DATE%.log`,
      datePattern: 'D-M-YYYY',
      format: combine(timestamp({ format: 'HH:mm:ss' }), json())
    }),
    new transports.Console({
      level: 'info',
      format: combine(colorize(), timestamp({ format: 'HH:mm:ss' }), textFormat)
    })
  ]
})

/**
 * @description The warn logger
 * @type {winston.Logger}
 */
const { warn } = createLogger({
  levels: { warn: 4 },
  transports: [
    new transports.DailyRotateFile({
      level: 'warn',
      maxFiles: '3d',
      filename: `./logs/${process.argv[2]}/warn@%DATE%.log`,
      datePattern: 'D-M-YYYY',
      format: combine(timestamp({ format: 'HH:mm:ss' }), json())
    }),
    new transports.Console({
      level: 'warn',
      format: combine(colorize(), timestamp({ format: 'HH:mm:ss' }), textFormat)
    })
  ]
})

/**
 * @description The error logger
 * @type {winston.Logger}
 */
const { error } = createLogger({
  levels: { error: 3 },
  transports: [
    new transports.DailyRotateFile({
      level: 'error',
      maxFiles: '3d',
      filename: `./logs/${process.argv[2]}/error@%DATE%.log`,
      datePattern: 'D-M-YYYY',
      format: combine(timestamp({ format: 'HH:mm:ss' }), json())
    }),
    new transports.Console({
      level: 'error',
      format: combine(colorize(), timestamp({ format: 'HH:mm:ss' }), textFormat)
    })
  ]
})

/**
 * @description The incoming logger
 * @type {winston.Logger}
 */
const { incoming } = createLogger({
  levels: { incoming: 6 },
  transports: [
    new transports.DailyRotateFile({
      level: 'incoming',
      maxFiles: '2d',
      filename: `./logs/${process.argv[2]}/incoming@%DATE%.log`,
      datePattern: 'D-M-YYYY',
      format: combine(timestamp({ format: 'HH:mm:ss' }), json())
    }),
    new transports.Console({
      level: 'incoming',
      format: combine(colorize(), timestamp({ format: 'HH:mm:ss' }), jsonFormat)
    })
  ]
})

/**
 * @description The outgoing logger
 * @type {winston.Logger}
 */
const { outgoing } = createLogger({
  levels: { outgoing: 6 },
  transports: [
    new transports.DailyRotateFile({
      level: 'outgoing',
      maxFiles: '2d',
      filename: `./logs/${process.argv[2]}/outgoing@%DATE%.log`,
      datePattern: 'D-M-YYYY',
      format: combine(timestamp({ format: 'HH:mm:ss' }), json())
    }),
    new transports.Console({
      level: 'outgoing',
      format: combine(colorize(), timestamp({ format: 'HH:mm:ss' }), jsonFormat)
    })
  ]
})

/**
 * @description The extension logger
 * @type {winston.Logger}
 */
const { extension } = createLogger({
  levels: { extension: 6 },
  transports: [
    new transports.DailyRotateFile({
      level: 'extension',
      maxFiles: '2d',
      filename: `./logs/${process.argv[2]}/extension@%DATE%.log`,
      datePattern: 'D-M-YYYY',
      format: combine(timestamp({ format: 'HH:mm:ss' }), json())
    }),
    new transports.Console({
      level: 'extension',
      format: combine(colorize(), timestamp({ format: 'HH:mm:ss' }), textFormat)
    })
  ]
})

/**
 * @exports
 */
module.exports = {
  debug: (msg) => debug(msg),
  info: (msg) => info(msg),
  warn: (msg) => warn(msg),
  error: (msg) => error(msg),
  incoming: (msg) => incoming(msg),
  outgoing: (msg) => outgoing(msg),
  extension: (msg) => extension(msg)
}
