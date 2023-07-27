export class OpenAIProductSuggetionServiceException extends Error {
	constructor(message: string) {
		super(message)
		this.name = "OpenAIProductSuggetionServiceException"
		this.message = "Error "
	}
}
