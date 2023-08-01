export class TemplateNotValidException extends Error {
	constructor(message: string) {
		super(message)
		this.name = "TemplateNotValidException"
	}
}
