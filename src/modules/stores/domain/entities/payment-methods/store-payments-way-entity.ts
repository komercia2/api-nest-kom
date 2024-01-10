export class StorePaymentsWayEntity {
	constructor(
		readonly id: number,
		readonly estado: boolean,
		readonly formId: string,
		readonly tiendasId: number,
		readonly createdAt: Date,
		readonly updatedAt: Date
	) {
		this.id = id
		this.estado = estado
		this.formId = formId
		this.tiendasId = tiendasId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}
