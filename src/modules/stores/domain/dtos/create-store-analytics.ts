import { IsEnum, IsNumber } from "class-validator"

import { StoreAnalyticsEvent } from "../entities"

export class CreateStoreAnalyticsDto {
	@IsNumber()
	public readonly storeId: number

	@IsEnum(StoreAnalyticsEvent)
	public readonly event: StoreAnalyticsEvent
}
