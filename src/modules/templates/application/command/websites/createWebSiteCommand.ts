import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { WebSiteEntityProps } from "@templates/domain/entities/websites"
import { ITemplate15Repository, IWebSitesRepository } from "@templates/domain/repositories"

import { CreateWebSiteDto } from "../dtos"

@Injectable()
export class CreateWebSiteCommand {
	private readonly allowedTemplatesRepositories = new Map<number, ITemplate15Repository>([
		[15, this.template15Repository]
	])

	constructor(
		@Inject(ApplicationInjectionTokens.IWebSiteRepository)
		private readonly webSiteRepoitory: IWebSitesRepository,

		@Inject(ApplicationInjectionTokens.ITemplate15Repository)
		private readonly template15Repository: ITemplate15Repository
	) {}

	async execute(storeId: number, createWebSiteDto: CreateWebSiteDto) {
		const data = { ...createWebSiteDto, storeId }
		const { templateNumber } = data

		const templateRepository = this.getTemplateRepository(templateNumber)

		if (!templateRepository) {
			const websiteWithoutTemplate = await this.saveWebsite({ ...data })
			return !!websiteWithoutTemplate
		}

		try {
			const { _id: templateId } = await this.template15Repository.create(storeId)
			await this.saveWebsite({ ...data, templateId })
		} catch (error) {
			return false
		}

		return true
	}

	private getTemplateRepository(templateNumber: number) {
		return this.allowedTemplatesRepositories.get(templateNumber)
	}

	private saveWebsite(data: WebSiteEntityProps) {
		return this.webSiteRepoitory.createWebSite(data)
	}
}
