import winston from 'winston';

const customLevelsOptions = {
    levels: {
        // Desarrollo
        debug: 0, 
        http: 1,

        // Produccion
        info: 2, 
        warning: 3,
        error: 4,
        fatal: 5
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        debug: 'white',
        http: 'green'
    }
}

const logger = winston.createLogger({

    levels: customLevelsOptions.levels,

    transports: [
        new winston.transports.Console({
            filename: './errors.log',
            level: 'debug',
            format: winston.format.combine(winston.format.simple())
        }),
        new winston.transports.Console({
            filename: './errors.log',
            level: 'http',
            format: winston.format.combine(winston.format.simple())
        }),
        new winston.transports.Console({
            filename: './errors.log',
            level: 'info',
            format: winston.format.combine(winston.format.simple())
        }),
        new winston.transports.Console({
            filename: './errors.log',
            level: 'warning',
            format: winston.format.combine(winston.format.simple())
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'error',
            format: winston.format.combine(winston.format.simple())
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'fatal',
            format: winston.format.combine(winston.format.simple())
        })
    ]
});

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.info(`${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
}