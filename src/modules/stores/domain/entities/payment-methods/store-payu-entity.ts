interface TiendaPayuInfo {
	id: number
	merchantId: string
	accountId: string
	pruebas: boolean
	tiendaId: number
	createdAt: Date
	updatedAt: Date
	apiLogin: string
	apiKey: string
}

export class PayUEntity {
	constructor(
		readonly id: number,
		readonly merchantId: string,
		readonly accountId: string,
		readonly pruebas: boolean,
		readonly tiendaId: number,
		readonly createdAt: Date,
		readonly updatedAt: Date,
		readonly apiLogin: string,
		readonly apiKey: string
	) {
		this.id = id
		this.merchantId = merchantId
		this.accountId = accountId
		this.pruebas = pruebas
		this.tiendaId = tiendaId
		this.createdAt = createdAt
		this.apiLogin = apiLogin
		this.apiKey = apiKey
	}

	static fromPersistence(payuInfo: TiendaPayuInfo) {
		return new PayUEntity(
			payuInfo.id,
			payuInfo.merchantId,
			payuInfo.accountId,
			payuInfo.pruebas,
			payuInfo.tiendaId,
			payuInfo.createdAt,
			payuInfo.updatedAt,
			payuInfo.apiLogin,
			payuInfo.apiKey
		)
	}
}
