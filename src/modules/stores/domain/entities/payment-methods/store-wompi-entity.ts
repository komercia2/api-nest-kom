export class StoreWompiEntity {
	constructor(
		readonly id: string,
		readonly llavePublica: string,
		readonly idTienda: number,
		readonly createdAt: Date | null,
		readonly updatedAt: Date | null
	) {
		this.id = id
		this.llavePublica = llavePublica
		this.idTienda = idTienda
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}
