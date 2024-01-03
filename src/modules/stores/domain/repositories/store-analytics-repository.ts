import { CreateStoreAnalyticsDto, GetFilteredStoreAnalyticsDto } from "../dtos"
import { StoreAnalyticsEntity } from "../entities"

export interface IStoreAnalyticsRepository {
	save(storeAnalytics: CreateStoreAnalyticsDto): Promise<void>

	getFiltered(
		storeId: number,
		filter: GetFilteredStoreAnalyticsDto
	): Promise<StoreAnalyticsEntity[]>
}
