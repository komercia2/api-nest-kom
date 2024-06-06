import { Transform, Type } from "class-transformer"
import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { StoreAnalyticsEvent } from "src/modules/stores/domain/entities"

const eventTypes = Object.values(StoreAnalyticsEvent)

export class GetEventHistoryDto {
	@IsOptional()
	@Type(() => Date)
	startDate?: Date

	@IsOptional()
	@Type(() => Date)
	endDate?: Date

	@IsNotEmpty()
	@IsString()
	@IsIn(eventTypes)
	@Transform(({ value }) => value.toUpperCase())
	event: StoreAnalyticsEvent
}
