import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { WebSiteEntityProps } from "@templates/domain/entities/websites"
import { StoreAlreadyHasMainWebSiteException } from "@templates/domain/exceptions"
import { IWebSitesRepository } from "@templates/domain/repositories"

import { CreateWebSiteDto } from "../dtos"

@Injectable()
export class CreateWebSiteCommand {
	constructor(
		@Inject(ApplicationInjectionTokens.IWebSiteRepository)
		private readonly webSiteRepoitory: IWebSitesRepository
	) {}

	/**
	 * @description Create a website for a store
	 * @param storeId Store id
	 * @param createWebSiteDto WebSite data
	 * @returns True if website was created, false otherwise
	 */
	async execute(storeId: number, createWebSiteDto: CreateWebSiteDto) {
		const data = { ...createWebSiteDto, storeId }
		const { templateNumber, isMain } = data

		if (isMain) await this.validateIfStoreHasMainWebSite(storeId)

		const templateRepository = this.webSiteRepoitory.findTemplateRepository(templateNumber)

		if (!templateRepository) {
			const websiteWithoutTemplate = await this.saveWebsite({ ...data, templateId: null })
			return !!websiteWithoutTemplate
		}

		try {
			// const { _id: templateId } = await this.template15Repository.create(storeId)
			// await this.saveWebsite({ ...data, templateId })

			await this.saveWebsite({ ...data })
		} catch (error) {
			throw error
		}

		return true
	}

	/**
	 * @description Validate if store has main website
	 * @param storeId Store id
	 */
	private async validateIfStoreHasMainWebSite(storeId: number) {
		const hasMainWebSite = await this.webSiteRepoitory.checkIfStoreHasMainWebSite(storeId)

		if (hasMainWebSite)
			throw new StoreAlreadyHasMainWebSiteException("Store already has main website")
	}

	private saveWebsite(data: WebSiteEntityProps) {
		return this.webSiteRepoitory.createWebSite(data)
	}
}
