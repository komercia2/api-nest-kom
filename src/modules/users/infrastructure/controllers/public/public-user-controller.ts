import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Inject,
	Param,
	Post,
	Put,
	Req,
	Res,
	UseGuards
} from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { CheckoutJwtGuard } from "@shared/infrastructure/guards"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import {
	CreateUserAdressCommand,
	DeleteUserAdressCommand
} from "src/modules/users/application/command"
import { CreateCheckoutUserCommand } from "src/modules/users/application/command/create-checkout-user.command"
import { UpdateIdentificationDocumentCommand } from "src/modules/users/application/command/update-identification-document.command"
import {
	AuthenticateCheckoutUserQuery,
	GetAdressesByUserIdQuery
} from "src/modules/users/application/query"
import { CreateCheckoutUserDto } from "src/modules/users/domain/dtos/create-checkout-user.dto"
import { UpdateIdentificationDocumentDto } from "src/modules/users/domain/dtos/update-identification-document.dto"

import { CreateUserAdressDto } from "../../dtos"
import { UsersInfrastructureInjectionTokens } from "../../users-infrastructure-injection-tokens"

@ApiTags("Users")
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
		private readonly authenticateCheckoutUserQuery: AuthenticateCheckoutUserQuery,

		@Inject(UsersInfrastructureInjectionTokens.CreateCheckoutUserCommand)
		private readonly createCheckoutUserCommand: CreateCheckoutUserCommand,

		@Inject(UsersInfrastructureInjectionTokens.UpdateIdentificationDocumentCommand)
		private readonly updateIdentificationDocumentCommand: UpdateIdentificationDocumentCommand
	) {}

	@Put("users/identification-document")
	async updateIdentificationDocument(
		@Req() _req: Request,
		@Res() res: Response,
		@Body() body: UpdateIdentificationDocumentDto
	) {
		try {
			await this.updateIdentificationDocumentCommand.execute(body)

			return handlerHttpResponse(res, {
				data: null,
				message: "Identification document updated successfully",
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			if (error instanceof HttpException) {
				return handlerHttpResponse(res, {
					data: null,
					message: error.message,
					statusCode: error.getStatus(),
					success: false
				})
			}

			console.log(error)
			return handlerHttpResponse(res, {
				data: null,
				message: "Error updating identification document",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}

	@Post("users")
	async createCheckoutUser(
		@Req() _req: Request,
		@Res() res: Response,
		@Body() body: CreateCheckoutUserDto
	) {
		try {
			const user = await this.createCheckoutUserCommand.execute(body)

			return handlerHttpResponse(res, {
				data: user,
				message: "User created successfully",
				statusCode: HttpStatus.CREATED,
				success: true
			})
		} catch (error) {
			if (error instanceof HttpException) {
				return handlerHttpResponse(res, {
					data: null,
					message: error.message,
					statusCode: error.getStatus(),
					success: false
				})
			}

			console.log(error)
			return handlerHttpResponse(res, {
				data: null,
				message: "Error creating user",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}

	@Post("users/authenticate-checkout")
	async authenticateCheckoutUser(
		@Req() _req: Request,
		@Res() res: Response,
		@Body() body: { document: string }
	) {
		const { document } = body

		const token = await this.authenticateCheckoutUserQuery.execute(document)

		return handlerHttpResponse(res, {
			data: token,
			message: "User authenticated successfully",
			statusCode: HttpStatus.OK,
			success: true
		})
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
			const address = await this.createUserAdressCommand.execute(userId, { ...body })
			console.log(address)
			return handlerHttpResponse(res, {
				data: address,
				message: "User adress created successfully",
				statusCode: HttpStatus.CREATED,
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
