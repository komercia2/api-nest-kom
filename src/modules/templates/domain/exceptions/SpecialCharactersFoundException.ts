export class SpecialCharactersFoundException extends Error {
	constructor(message: string) {
		super(message)
		this.message = message
		this.name = "SpecialCharactersFoundException"
	}
}
