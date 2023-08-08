export class SubDomainNotAvaibleException extends Error {
	constructor(meesage: string) {
		super(meesage)
		this.name = "SubDomainNotAvaibleException"
	}
}
