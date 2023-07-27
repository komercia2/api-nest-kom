export class TemplateAlreadyExistsException extends Error {
	constructor(message: string) {
		super(message)
		this.name = "TemplateAlreadyExistsException"
	}
}
