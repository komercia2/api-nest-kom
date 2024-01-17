import { CreateStoreAnalyticsDto, GetFilteredStoreAnalyticsDto } from "../dtos"
import { StoreAnalyticsEntity, StoreAnalyticsEvent } from "../entities"

export interface IStoreAnalyticsRepository {
	save(storeAnalytics: CreateStoreAnalyticsDto): Promise<void>

	getFiltered(
		storeId: number,
		filter: GetFilteredStoreAnalyticsDto
	): Promise<StoreAnalyticsEntity[]>

	countAllEvents(storeId: number): Promise<{ key: StoreAnalyticsEvent; value: number }>

	countDevices(storeId: number): Promise<{ key: string; value: number }>
}
