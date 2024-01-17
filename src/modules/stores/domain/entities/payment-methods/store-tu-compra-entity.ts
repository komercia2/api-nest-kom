export class StoreTuCompraEntity {
	constructor(
		readonly id: string,
		readonly username: string,
		readonly estado: boolean,
		readonly tiendasId: number,
		readonly createdAt: Date | null,
		readonly updatedAt: Date | null
	) {
		this.id = id
		this.username = username
		this.estado = estado
		this.tiendasId = tiendasId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}
