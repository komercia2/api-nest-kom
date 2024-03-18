import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

export class ChangePasswordDto {
	@IsNumber()
	@Type(() => Number)
	readonly userId: number

	@IsString()
	@IsNotEmpty()
	@Length(6)
	readonly newPassword: string
}
