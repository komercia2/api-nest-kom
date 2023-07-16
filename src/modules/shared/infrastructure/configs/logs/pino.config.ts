/**
 * @fileoverview pino config.
 * @see {@https://www.npmjs.com/package/nestjs-pino}
 */
export const pinoConfig = {
	pinoHttp: {
		transport: {
			target: "pino-pretty",
			options: { colorize: true, singleLine: true, messagekey: "message" }
		}
	}
}
