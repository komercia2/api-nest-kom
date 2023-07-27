export class TemplateNotFoundException extends Error {
	constructor(message: string) {
		super(message)
		this.name = "TemplateNotFoundException"
	}
}
