import { Inject } from "@nestjs/common"
import { UpdateWebSiteDto } from "@templates/application/command/dtos"
import { IStoreInfo, WebSiteEntity, WebSiteEntityProps } from "@templates/domain/entities/websites"
import { WebSiteTemplate } from "@templates/domain/entities/websites/webSiteTemplate"
import { IWebSitesRepository } from "@templates/domain/repositories"
import { TemplateRepository } from "@templates/domain/types"

import { InfrastructureInjectionTokens } from "../infrastructure-injection.tokens"
import { MysqlTemplatesService, WebSiteMockService, WebsiteMongooseService } from "../services"

export class WebsiteMongooseRepository implements IWebSitesRepository {
	constructor(
		@Inject(InfrastructureInjectionTokens.WebsiteMongooseService)
		private readonly websiteMongooseService: WebsiteMongooseService,

		@Inject(InfrastructureInjectionTokens.WebSiteMockService)
		private readonly webSiteMockService: WebSiteMockService,

		@Inject(InfrastructureInjectionTokens.MySqlTemplatesRepository)
		private readonly mysqlTemplatesService: MysqlTemplatesService
	) {}

	async incrementViews(storeId: number): Promise<boolean> {
		return await this.mysqlTemplatesService.incrementViews(storeId)
	}

	async findMySQLTemplateByCriteria(
		criteria: string,
		isDomain: boolean
	): Promise<IStoreInfo | null> {
		return await this.mysqlTemplatesService.findMySQLTemplateByCriteria(criteria, isDomain)
	}

	async findTemplateRepository(templateNumber: number): Promise<TemplateRepository | null> {
		return await this.webSiteMockService.getWebSiteRepository(templateNumber)
	}
	async createWebSite(props: WebSiteEntityProps): Promise<boolean> {
		return await this.websiteMongooseService.create(props)
	}

	async updateSettings(
		_id: string,
		templateNumber: number,
		settings: WebSiteTemplate
	): Promise<boolean> {
		return await this.websiteMongooseService.updateSettings(_id, templateNumber, settings)
	}

	async delete(_id: string, templateId: string): Promise<boolean> {
		return await this.websiteMongooseService.delete(_id, templateId)
	}

	async getWebSite(target: string, criteria?: string): Promise<WebSiteEntity | null> {
		return await this.websiteMongooseService.getWebSite(target, criteria)
	}

	async getWebSiteListByStoreId(storeId: number): Promise<WebSiteEntity[]> {
		return await this.websiteMongooseService.getWebsitesById(storeId)
	}

	async checkDomainAvailability(domain: string): Promise<boolean> {
		return await this.websiteMongooseService.verifyDomainAvailability(domain)
	}

	async checkSubdomainAvailability(subdomain: string): Promise<boolean> {
		return await this.websiteMongooseService.verifySubDomainAvailability(subdomain)
	}

	async findTemplateIdByCriteria(criteria: string, isDomain: boolean): Promise<string | null> {
		return await this.websiteMongooseService.findTemplateIdByCriteria(criteria, isDomain)
	}

	async checkIfStoreHasMainWebSite(storeId: number): Promise<boolean> {
		return await this.websiteMongooseService.checkIfStoreHasMainWebSite(storeId)
	}

	async updateWebsiteInfo(_id: string, props: UpdateWebSiteDto): Promise<WebSiteEntity> {
		return await this.websiteMongooseService.update(_id, props)
	}
}
