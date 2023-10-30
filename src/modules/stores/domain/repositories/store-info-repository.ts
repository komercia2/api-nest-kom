import { Tiendas } from "src/entities"

export interface IStoreInfoRepository {
	getStoreInfo(storeId: number): Promise<Tiendas>
}
