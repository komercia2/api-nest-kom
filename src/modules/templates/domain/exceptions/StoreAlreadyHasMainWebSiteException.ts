export class StoreAlreadyHasMainWebSiteException extends Error {
	constructor(message: string) {
		super(message)
		this.name = "StoreAlreadyHasMainWebSiteException"
	}
}
