import { EntidadesTiendas, Tiendas } from "src/entities"

export interface IStoreInfoRepository {
	getStoreInfo(storeId: number): Promise<Tiendas | null>
	getStoresInfoByEntityId(entityId: number): Promise<EntidadesTiendas[]>
}
