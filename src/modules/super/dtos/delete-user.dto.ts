import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class DeleteUserDto {
	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	readonly userId: number

	@IsString()
	@IsNotEmpty()
	readonly key: string
}
