import { StoreEntitiesStoresEntity } from "./store-entities-stores-entity"

interface IStoreEntitiesEntity {
	id: number
	nombre: string
	logo: string | null
	createdAt: Date | null
	updatedAt: Date | null
	entidadesTiendas: StoreEntitiesStoresEntity[]
}

export class StoreEntitiesEntity implements IStoreEntitiesEntity {
	id: number
	nombre: string
	logo: string | null
	createdAt: Date | null
	updatedAt: Date | null
	entidadesTiendas: StoreEntitiesStoresEntity[]

	constructor(storeEntities: IStoreEntitiesEntity) {
		this.id = storeEntities.id
		this.nombre = storeEntities.nombre
		this.logo = storeEntities.logo
		this.createdAt = storeEntities.createdAt
		this.updatedAt = storeEntities.updatedAt
		this.entidadesTiendas = storeEntities.entidadesTiendas
	}
}
