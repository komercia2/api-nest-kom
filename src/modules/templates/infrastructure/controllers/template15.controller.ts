import {
	Body,
	ConflictException,
	Controller,
	Delete,
	Get,
	Inject,
	InternalServerErrorException,
	NotFoundException,
	Param,
	Patch,
	Post,
	Req,
	Res,
	UsePipes
} from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { DatabaseTransactionErrorException } from "@shared/infrastructure/exceptions"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import {
	CreateTemplate15Command,
	DeleteTemplate15Command,
	UpdateTemplate15Command
} from "@templates/application/command"
import { FindTemplate15ByIdQuery } from "@templates/application/query"
import { Template15 } from "@templates/domain/entities/template15"
import { HttpStatusCode } from "axios"
import { Request, Response } from "express"

import {
	Tempalte15NotRemovedException,
	TemplateAlreadyExistsException,
	TemplateNotFoundException,
	TemplateNotUpdatedException
} from "../../application/exceptions"
import { InfrastructureInjectionTokens } from "../infrastructure-injection.tokens"

@ApiTags("Templates")
@Controller("template15")
export class Template15Controller {
	constructor(
		@Inject(InfrastructureInjectionTokens.CreateTemplate15Command)
		private readonly createTemplate15Command: CreateTemplate15Command,

		@Inject(InfrastructureInjectionTokens.FindTemplate15ByIdQuery)
		private readonly findTemplate15ByIdQuery: FindTemplate15ByIdQuery,

		@Inject(InfrastructureInjectionTokens.UpdateTemplate15Command)
		private readonly updateTemplate15Command: UpdateTemplate15Command,

		@Inject(InfrastructureInjectionTokens.DeleteTemplate15Command)
		private readonly deleteTemplate15Command: DeleteTemplate15Command
	) {}

	@Get(":storeId")
	async findTemplate15ById(@Param("storeId") storeId: number, @Res() res: Response) {
		try {
			const template = await this.findTemplate15ByIdQuery.execute(storeId)
			res.status(HttpStatusCode.Ok).json({ data: template, message: "Template15 found" })
		} catch (error) {
			if (error instanceof TemplateNotFoundException) {
				throw new NotFoundException(error.message)
			}

			if (error instanceof DatabaseTransactionErrorException) {
				throw new InternalServerErrorException(error.message)
			}

			throw new InternalServerErrorException("Error finding template15 by id")
		}
	}

	@Post()
	async createTemplate15(@Req() request: Request, @Res() res: Response) {
		try {
			const storeId = Number(request.id)
			const template = await this.createTemplate15Command.execute({ storeId })
			handlerHttpResponse(res, {
				statusCode: HttpStatusCode.Created,
				data: template,
				message: "Template15 created successfully",
				success: true
			})
		} catch (error) {
			console.log(error)
			if (error instanceof TemplateAlreadyExistsException) {
				throw new ConflictException(error.message)
			}

			if (error instanceof DatabaseTransactionErrorException) {
				throw new InternalServerErrorException(error.message)
			}

			throw new InternalServerErrorException("Error creating template15")
		}
	}

	@Patch()
	@UsePipes()
	async updateTemplate15(
		@Req() request: Request,
		@Body() templateData: Template15,
		@Res() res: Response
	) {
		try {
			const storeId = Number(request.id)
			const template = await this.updateTemplate15Command.execute(storeId, templateData)
			res.status(HttpStatusCode.Ok).json({ data: template, message: "Template15 updated" })
		} catch (error) {
			if (error instanceof TemplateNotUpdatedException) {
				throw new NotFoundException(error.message)
			}

			if (error instanceof DatabaseTransactionErrorException) {
				throw new InternalServerErrorException(error.message)
			}

			throw new InternalServerErrorException("Error updating template15")
		}
	}

	@Delete()
	async deleteTemplate15(@Req() request: Request, @Res() res: Response) {
		try {
			const storeId = Number(request.id)
			const template = await this.deleteTemplate15Command.execute(storeId)
			res.status(HttpStatusCode.Ok).json({ data: template, message: "Template15 deleted" })
		} catch (error) {
			if (error instanceof Tempalte15NotRemovedException) {
				throw new NotFoundException(error.message)
			}

			if (error instanceof DatabaseTransactionErrorException) {
				throw new InternalServerErrorException(error.message)
			}

			throw new InternalServerErrorException("Error deleting template15")
		}
	}
}
