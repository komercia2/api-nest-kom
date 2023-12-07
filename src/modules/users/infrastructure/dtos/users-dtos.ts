import { IsNotEmpty, IsNumber } from "class-validator"

export class UpdateUserRoleDTO {
	@IsNotEmpty()
	@IsNumber()
	role: number
}
