import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Inject,
	Param,
	Patch,
	Post,
	Query,
	Req,
	Res,
	UsePipes
} from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { CreateWebSiteDto, UpdateWebSiteDto } from "@templates/application/command/dtos"
import {
	CreateWebSiteCommand,
	DeleteWebsiteCommand,
	UpdateWebSiteCommand,
	UpdateWebsiteSettingsCommand
} from "@templates/application/command/websites"
import {
	CheckDomainAvailabilityQuery,
	CheckSubDomainAvailabilityQuery,
	GetWebsitesByIdQuery
} from "@templates/application/query/websites"
import { GetWebsiteQuery } from "@templates/application/query/websites/getWebsiteQuery"
import { WebSiteTemplate } from "@templates/domain/entities/websites/webSiteTemplate"
import {
	DomainNotAvaibleException,
	StoreAlreadyHasMainWebSiteException,
	SubDomainNotAvaibleException,
	TemplateNotAvaibleException,
	TemplateNotValidException
} from "@templates/domain/exceptions"
import { Request, Response } from "express"

import { InfrastructureInjectionTokens } from "../infrastructure-injection.tokens"

@ApiTags("Websites")
@Controller("websites")
export class WebsitesController {
	constructor(
		@Inject(InfrastructureInjectionTokens.CreateWebsiteCommand)
		private readonly createWebsiteCommand: CreateWebSiteCommand,

		@Inject(InfrastructureInjectionTokens.CheckDomainAvailabilityQuery)
		private readonly checkDomainAvailabilityQuery: CheckDomainAvailabilityQuery,

		@Inject(InfrastructureInjectionTokens.CheckSubDomainAvailabilityQuery)
		private readonly checkSubDomainAvailabilityQuery: CheckSubDomainAvailabilityQuery,

		@Inject(InfrastructureInjectionTokens.GetWebsitesByIdQuery)
		private readonly getWebsitesByIdQuery: GetWebsitesByIdQuery,

		@Inject(InfrastructureInjectionTokens.GetWebsiteQuery)
		private readonly getWebsiteQuery: GetWebsiteQuery,

		@Inject(InfrastructureInjectionTokens.UpdateWebsiteCommand)
		private readonly updateWebsiteCommand: UpdateWebSiteCommand,

		@Inject(InfrastructureInjectionTokens.UpdateWebsiteSettingsCommand)
		private readonly updateWebsiteSettingsCommand: UpdateWebsiteSettingsCommand,

		@Inject(InfrastructureInjectionTokens.DeleteWebsiteCommand)
		private readonly deleteWebsiteCommand: DeleteWebsiteCommand
	) {}

	@Post()
	@UsePipes()
	async createWebSite(@Req() req: Request, @Body() body: CreateWebSiteDto, @Res() res: Response) {
		try {
			const webSite = await this.createWebsiteCommand.execute(Number(req.id), body)

			return handlerHttpResponse(res, {
				data: webSite,
				message: "WebSite created",
				statusCode: HttpStatus.CREATED,
				success: true
			})
		} catch (error) {
			console.log(error)
			if (
				error instanceof StoreAlreadyHasMainWebSiteException ||
				error instanceof DomainNotAvaibleException ||
				error instanceof SubDomainNotAvaibleException
			) {
				return handlerHttpResponse(res, {
					message: error.message,
					statusCode: HttpStatus.CONFLICT,
					success: false,
					data: null
				})
			}

			return handlerHttpResponse(res, {
				message: "Error creating website",
				success: false,
				data: null,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}

	@Get("template")
	async getWebsiteFromCriteria(@Query("criteria") criteria: string, @Res() res: Response) {
		try {
			const websiteWithSettings = await this.getWebsiteQuery.execute(criteria)

			if (!websiteWithSettings?.templateId) {
				return handlerHttpResponse(res, {
					data: websiteWithSettings,
					message:
						"Website required does not have a template associated. Please consult in another templates service",
					statusCode: HttpStatus.OK,
					success: true
				})
			}

			return handlerHttpResponse(res, {
				data: websiteWithSettings,
				message: "Template found by criteria",
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			if (error instanceof TemplateNotAvaibleException) {
				return handlerHttpResponse(res, {
					message: error.message,
					success: false,
					data: null,
					statusCode: HttpStatus.NOT_FOUND
				})
			}

			return handlerHttpResponse(res, {
				message: "Error getting template by criteria",
				success: false,
				data: null,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}

	@Get()
	async getWebsites(@Req() req: Request, @Res() res: Response) {
		try {
			const webSite = await this.getWebsitesByIdQuery.execute(Number(req.id))

			return handlerHttpResponse(res, {
				data: webSite,
				message: "WebSite found",
				success: true,
				statusCode: HttpStatus.OK
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				message: "Error getting website",
				success: false,
				data: null,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}

	@Patch("settings/:websiteId/:nTemplate")
	@UsePipes()
	async updateWebsiteTemplateSettings(
		@Param("websiteId") websiteId: string,
		@Param("nTemplate") nTemplate: number,
		@Body() body: WebSiteTemplate,
		@Res() res: Response
	) {
		try {
			const webSite = await this.updateWebsiteSettingsCommand.execute(
				websiteId,
				Number(nTemplate),
				body
			)

			return handlerHttpResponse(res, {
				data: { updated: webSite },
				message: "WebSite settings updated",
				success: true,
				statusCode: HttpStatus.OK
			})
		} catch (error) {
			if (error instanceof TemplateNotValidException) {
				return handlerHttpResponse(res, {
					message: error.message,
					success: false,
					data: null,
					statusCode: HttpStatus.NOT_FOUND
				})
			}

			return handlerHttpResponse(res, {
				message: "Error updating website",
				success: false,
				data: null,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}

	@Patch(":websiteId")
	async updateWebsite(
		@Param("websiteId") websiteId: string,
		@Req() req: Request,
		@Body() body: UpdateWebSiteDto,
		@Res() res: Response
	) {
		try {
			const { id } = req
			const webSite = await this.updateWebsiteCommand.execute(websiteId, Number(id), body)

			return handlerHttpResponse(res, {
				data: webSite,
				message: "WebSite data updated",
				success: true,
				statusCode: HttpStatus.OK
			})
		} catch (error) {
			if (error instanceof StoreAlreadyHasMainWebSiteException) {
				return handlerHttpResponse(res, {
					message: error.message,
					statusCode: HttpStatus.CONFLICT,
					success: false,
					data: null
				})
			}

			if (error instanceof TemplateNotAvaibleException) {
				return handlerHttpResponse(res, {
					message: error.message,
					success: false,
					data: null,
					statusCode: HttpStatus.NOT_FOUND
				})
			}

			return handlerHttpResponse(res, {
				message: "Error updating website",
				success: false,
				data: null,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}

	@Delete(":id")
	async deleteWebsite(
		@Query("templateId") templateId: string,
		@Param("id") id: string,
		@Res() res: Response
	) {
		try {
			const deleted = await this.deleteWebsiteCommand.execute(id, templateId)

			return handlerHttpResponse(res, {
				data: { deleted },
				message: "WebSite deleted",
				success: true,
				statusCode: HttpStatus.OK
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				message: "Error deleting website",
				success: false,
				data: null,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}

	@Post("domain")
	async verifyDomainAvailability(@Query("domain") domain: string, @Res() res: Response) {
		try {
			const isAvailable = await this.checkDomainAvailabilityQuery.execute(domain)
			res.status(HttpStatus.OK).json({
				data: {
					isAvailable: isAvailable
				},
				message: "Domain available"
			})
		} catch (error) {
			if (error instanceof DomainNotAvaibleException) {
				return handlerHttpResponse(res, {
					message: error.message,
					statusCode: HttpStatus.CONFLICT,
					success: false,
					data: { isAvailable: false }
				})
			}

			return handlerHttpResponse(res, {
				message: "Error verifying domain availability",
				success: false,
				data: null,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}

	@Post("subdomain")
	async verifySubDomainAvailability(@Query("subdomain") subdomain: string, @Res() res: Response) {
		try {
			console.log(subdomain)
			const isAvailable = await this.checkSubDomainAvailabilityQuery.execute(subdomain)
			return handlerHttpResponse(res, {
				data: { isAvailable },
				message: "Subdomain available",
				success: true,
				statusCode: HttpStatus.OK
			})
		} catch (error) {
			if (error instanceof SubDomainNotAvaibleException) {
				return handlerHttpResponse(res, {
					message: error.message,
					statusCode: HttpStatus.CONFLICT,
					success: false,
					data: { isAvailable: false }
				})
			}

			return handlerHttpResponse(res, {
				message: "Error verifying subdomain availability",
				success: false,
				data: null,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}
}
