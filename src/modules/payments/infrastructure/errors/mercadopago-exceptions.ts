export class ClientMercadopagoException extends Error {
	constructor(message: string) {
		super(message)
		this.name = "ClientMercadopagoException"
	}
}

export class MercadopagoException extends Error {
	constructor(message: string) {
		super(message)
		this.name = "MercadopagoException"
	}
}
