export class AddiUtils {
	maxRedirects = 0
	validateStatus: (status: number) => boolean = (status: number) => status >= 200 && status < 400
	isRedirect = (status: number) => status >= 300 && status < 400
	isBadRequest = (status: number) => status >= 400 && status < 500
	isConflict = (status: number) => status === 409
	isServerError = (status: number) => status >= 500 && status
	getAudience = (env: string, staging: string, production: string) => {
		if (env === "STAGING") return staging
		if (env === "PRODUCTION") return production
	}
}
