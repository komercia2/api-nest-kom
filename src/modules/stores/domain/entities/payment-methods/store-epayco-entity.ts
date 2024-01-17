export class StoreEpaycoEntity {
	constructor(
		readonly id: number,
		readonly pKey: string,
		readonly pCustIdCliente: string,
		readonly idTienda: number,
		readonly createdAt: Date,
		readonly updatedAt: Date,
		readonly pruebas: boolean,
		readonly publicKey: string | null
	) {
		this.id = id
		this.pKey = pKey
		this.pCustIdCliente = pCustIdCliente
		this.idTienda = idTienda
		this.createdAt = createdAt
		this.updatedAt = updatedAt
		this.pruebas = pruebas
		this.publicKey = publicKey
	}
}
