interface IStoreWhatsappCheckoutEntity {
	id: string
	configuration: string
	tiendasId: number
	createdAt: Date | null
	updatedAt: Date | null
}

export class StoreWhatsappCheckoutEntity implements IStoreWhatsappCheckoutEntity {
	id: string
	configuration: string
	tiendasId: number
	createdAt: Date | null
	updatedAt: Date | null

	constructor(data: IStoreWhatsappCheckoutEntity) {
		this.id = data.id
		this.configuration = data.configuration
		this.tiendasId = data.tiendasId
		this.createdAt = data.createdAt
		this.updatedAt = data.updatedAt
	}
}
