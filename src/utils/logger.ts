import winston from 'winston';

const colors = {
	info: 'green',
	warn: 'yellow',
	error: 'red',
};

winston.addColors(colors);

const logger = winston.createLogger({
	levels: {
		info: 0,
		warn: 1,
		error: 2,
	},
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.printf((info) => {
					const { level, message, ...rest } = info;
					return `[${level.toUpperCase()}]: ${message} ${Object.keys(rest).length ? JSON.stringify(rest) : ''}`;
				}),
				winston.format.colorize({ all: true })
			),
		}),
	],
});

export default logger;
