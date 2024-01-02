import { CreateStoreAnalyticsDto } from "../dtos"

export interface IStoreAnalyticsRepository {
	save(storeAnalytics: CreateStoreAnalyticsDto): Promise<void>
}
