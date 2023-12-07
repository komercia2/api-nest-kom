import {
	Body,
	Controller,
	HttpStatus,
	Inject,
	Param,
	Put,
	Req,
	Res,
	UsePipes
} from "@nestjs/common"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import { UpdateRoleCommand } from "src/modules/users/application/command"

import { UpdateUserRoleDTO } from "../../dtos"
import { UsersInfrastructureInjectionTokens } from "../../users-infrastructure-injection-tokens"

@Controller("public")
export class PublicUserController {
	constructor(
		@Inject(UsersInfrastructureInjectionTokens.UpdateRoleCommand)
		private readonly updateRoleCommand: UpdateRoleCommand
	) {}

	@Put("role/:userId")
	@UsePipes()
	async updateRole(
		@Req() req: Request,
		@Res() res: Response,
		@Body() body: UpdateUserRoleDTO,
		@Param("userId") userId: string
	) {
		try {
			await this.updateRoleCommand.execute(userId, body.role)

			handlerHttpResponse(res, {
				data: null,
				message: "Role updated successfully",
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			handlerHttpResponse(res, {
				data: null,
				message: "Internal Server Error",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}
}
