export class AddiUtils {
	maxRedirects = 0
	validateStatus: (status: number) => boolean = (status: number) => status >= 200 && status < 400
	isRedirect = (status: number) => status >= 300 && status < 400
	isBadRequest = (status: number) => status >= 400 && status < 500
	isConflict = (status: number) => status === 409
	isServerError = (status: number) => status >= 500 && status
	getAudience = (isProdMode: number, staging: string, production: string) => {
		if (isProdMode === 0) return staging
		if (isProdMode === 1) return production
	}
}
