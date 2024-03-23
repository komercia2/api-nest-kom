import { IsArray } from "class-validator"

export class UpdateStoreEntitiesDto {
	@IsArray()
	readonly entities: number[]
}
