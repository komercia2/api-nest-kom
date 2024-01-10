export class StoreCredibancoEntity {
	constructor(
		readonly id: number,
		readonly username: string,
		readonly password: string,
		readonly idTienda: number,
		readonly createdAt: Date | null,
		readonly updatedAt: Date | null
	) {
		this.id = id
		this.username = username
		this.password = password
		this.idTienda = idTienda
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}
