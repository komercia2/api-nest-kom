interface IStoreEntitiesStoresEntity {
	id: number
	entidadId: number
	tiendaId: number
	createdAt: Date | null
	updatedAt: Date | null
}

export class StoreEntitiesStoresEntity implements IStoreEntitiesStoresEntity {
	id: number
	entidadId: number
	tiendaId: number
	createdAt: Date | null
	updatedAt: Date | null

	constructor(storeEntitiesStores: IStoreEntitiesStoresEntity) {
		this.id = storeEntitiesStores.id
		this.entidadId = storeEntitiesStores.entidadId
		this.tiendaId = storeEntitiesStores.tiendaId
		this.createdAt = storeEntitiesStores.createdAt
		this.updatedAt = storeEntitiesStores.updatedAt
	}
}
