import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Inject,
	Param,
	Post,
	Req,
	Res
} from "@nestjs/common"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import {
	CreateUserAdressCommand,
	DeleteUserAdressCommand
} from "src/modules/users/application/command"
import { GetAdressesByUserIdQuery } from "src/modules/users/application/query"

import { CreateUserAdressDto } from "../../dtos"
import { UsersInfrastructureInjectionTokens } from "../../users-infrastructure-injection-tokens"

@Controller("public")
export class PublicUserController {
	constructor(
		@Inject(UsersInfrastructureInjectionTokens.GetAdressesByUserIdQuery)
		private readonly getAdressesByUserIdQuery: GetAdressesByUserIdQuery,

		@Inject(UsersInfrastructureInjectionTokens.DeleteUserAdressCommand)
		private readonly deleteUserAdressCommand: DeleteUserAdressCommand,

		@Inject(UsersInfrastructureInjectionTokens.CreateUserAdressCommand)
		private readonly createUserAdressCommand: CreateUserAdressCommand
	) {}

	@Get("adresses/:userId")
	async getAdressesByUserId(
		@Req() _req: Request,
		@Res() res: Response,
		@Param("userId") userId: number
	) {
		try {
			const adresses = await this.getAdressesByUserIdQuery.execute(userId)

			return handlerHttpResponse(res, {
				data: adresses,
				message: `User adresses with id ${userId} fetched successfully`,
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Error getting user adresses",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}

	@Delete("adresses/:userId/:adressId")
	async deleteUserAdress(
		@Req() _req: Request,
		@Res() res: Response,
		@Param("userId") userId: number,
		@Param("adressId") adressId: number
	) {
		try {
			await this.deleteUserAdressCommand.execute(userId, adressId)

			return handlerHttpResponse(res, {
				data: null,
				message: `User adress with id ${adressId} deleted successfully`,
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			console.log(error)
			return handlerHttpResponse(res, {
				data: null,
				message: "Error deleting user adress",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}

	@Post("adresses/:userId")
	async createUserAdress(
		@Req() _req: Request,
		@Res() res: Response,
		@Param("userId") userId: number,
		@Body() body: CreateUserAdressDto
	) {
		await this.createUserAdressCommand.execute(userId, { ...body })
		try {
			return handlerHttpResponse(res, {
				data: null,
				message: `User adress with id ${userId} created successfully`,
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Error creating user adress",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}
}
