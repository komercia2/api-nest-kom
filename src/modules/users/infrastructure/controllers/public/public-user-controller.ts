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
	Res,
	UseGuards
} from "@nestjs/common"
import { CheckoutJwtGuard } from "@shared/infrastructure/guards"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import {
	CreateUserAdressCommand,
	DeleteUserAdressCommand
} from "src/modules/users/application/command"
import {
	AuthenticateCheckoutUserQuery,
	GetAdressesByUserIdQuery
} from "src/modules/users/application/query"

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
		private readonly createUserAdressCommand: CreateUserAdressCommand,

		@Inject(UsersInfrastructureInjectionTokens.AuthenticateCheckoutUserQuery)
		private readonly authenticateCheckoutUserQuery: AuthenticateCheckoutUserQuery
	) {}

	@Post("users/:userId/authenticate-checkout")
	async authenticateCheckoutUser(
		@Req() _req: Request,
		@Res() res: Response,
		@Param("userId") userId: number,
		@Body() body: { document: string }
	) {
		const { document } = body
		try {
			const token = await this.authenticateCheckoutUserQuery.execute(userId, document)

			return handlerHttpResponse(res, {
				data: token,
				message: "User authenticated successfully",
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			console.log(error)
			return handlerHttpResponse(res, {
				data: null,
				message: "Error authenticating user",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}

	@UseGuards(CheckoutJwtGuard)
	@Get("adresses/:userId")
	async getAdressesByUserId(@Req() req: Request, @Res() res: Response) {
		try {
			const { userId } = req.checkoutUser

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

	@UseGuards(CheckoutJwtGuard)
	@Delete("adresses/:adressId")
	async deleteUserAdress(
		@Req() req: Request,
		@Res() res: Response,
		@Param("adressId") adressId: number
	) {
		try {
			const { userId } = req.checkoutUser
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

	@UseGuards(CheckoutJwtGuard)
	@Post("adresses")
	async createUserAdress(
		@Req() req: Request,
		@Res() res: Response,
		@Body() body: CreateUserAdressDto
	) {
		const { userId } = req.checkoutUser

		try {
			await this.createUserAdressCommand.execute(userId, { ...body })
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
