type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const levelOrder: Record<LogLevel, number> = {
  debug: 10,
  error: 40,
  info: 20,
  warn: 30,
}

const envLevel = (process.env.LOG_LEVEL as LogLevel) || 'info'

function shouldLog(level: LogLevel) {
  return levelOrder[level] >= levelOrder[envLevel]
}

function format(meta?: Record<string, unknown>) {
  return meta && Object.keys(meta).length > 0 ? { ...meta } : undefined
}

export const logger = {
  debug(msg: string, meta?: Record<string, unknown>) {
    if (shouldLog('debug')) console.debug(msg, format(meta))
  },
  error(msg: string, meta?: Record<string, unknown>) {
    if (shouldLog('error')) console.error(msg, format(meta))
  },
  info(msg: string, meta?: Record<string, unknown>) {
    if (shouldLog('info')) console.info(msg, format(meta))
  },
  warn(msg: string, meta?: Record<string, unknown>) {
    if (shouldLog('warn')) console.warn(msg, format(meta))
  },
}
