export class WebsiteNotAvaibleException extends Error {
	constructor(message: string) {
		super(message)
		this.name = "WebsiteNotAvaibleException"
	}
}
