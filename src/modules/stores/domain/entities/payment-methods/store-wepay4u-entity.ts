export class StoreWePay4uEntity {
	constructor(
		readonly id: string,
		readonly key: string,
		readonly estado: boolean,
		readonly tiendasId: number,
		readonly createdAt: Date | null,
		readonly updatedAt: Date | null
	) {
		this.id = id
		this.key = key
		this.estado = estado
		this.tiendasId = tiendasId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}
