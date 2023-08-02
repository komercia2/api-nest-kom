import {
	Body,
	ConflictException,
	Controller,
	Get,
	HttpStatus,
	Inject,
	InternalServerErrorException,
	Post,
	Query,
	Req,
	Res,
	UsePipes
} from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { CreateWebSiteDto } from "@templates/application/command/dtos"
import { CreateWebSiteCommand } from "@templates/application/command/websites"
import {
	CheckDomainAvailabilityQuery,
	CheckSubDomainAvailabilityQuery
} from "@templates/application/query/websites"
import {
	DomainNotAvaibleException,
	SubDomainNotAvaibleException
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
		private readonly checkSubDomainAvailabilityQuery: CheckSubDomainAvailabilityQuery
	) {}

	@Post()
	@UsePipes()
	async createWebSite(@Req() req: Request, @Body() body: CreateWebSiteDto, @Res() res: Response) {
		try {
			const webSite = await this.createWebsiteCommand.execute(Number(req.id), body)
			res.status(HttpStatus.CREATED).json({ data: webSite, message: "WebSite created" })
		} catch (error) {
			throw new InternalServerErrorException(error)
		}
	}

	@Get("domain")
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
			if (error instanceof DomainNotAvaibleException) throw new ConflictException(error.message)

			throw new InternalServerErrorException(error)
		}
	}

	@Get("subdomain")
	async verifySubDomainAvailability(@Query("subdomain") subdomain: string, @Res() res: Response) {
		try {
			console.log(subdomain)
			const isAvailable = await this.checkSubDomainAvailabilityQuery.execute(subdomain)
			res.status(HttpStatus.OK).json({
				data: {
					isAvailable: isAvailable
				},
				message: "SubDomain available"
			})
		} catch (error) {
			if (error instanceof SubDomainNotAvaibleException) throw new ConflictException(error.message)

			throw new InternalServerErrorException(error)
		}
	}
}
