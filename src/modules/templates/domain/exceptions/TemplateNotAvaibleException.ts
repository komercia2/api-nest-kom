export class TemplateNotAvaibleException extends Error {
	constructor(message: string) {
		super(message)
		this.name = "TemplateNotAvaibleException"
	}
}
