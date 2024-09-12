import { IsNotEmpty, IsString } from "class-validator"

export class VerifyCodeDto {
	@IsString()
	@IsNotEmpty()
	readonly phoneNumber: string

	@IsString()
	@IsNotEmpty()
	readonly code: string
}
