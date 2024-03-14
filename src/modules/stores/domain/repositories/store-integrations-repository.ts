import { StoreIntegrationEntity } from "../entities"

export interface IStoreIntegrationsRepository {
	getStoreIntegrations(storeId: number): Promise<StoreIntegrationEntity[]>
}
