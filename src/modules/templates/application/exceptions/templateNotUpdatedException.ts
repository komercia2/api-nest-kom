export class TemplateNotUpdatedException extends Error {
	constructor(message: string) {
		super(message)
		this.name = "TemplateNotUpdatedException"
	}
}
