import { Inject } from "@nestjs/common"
import { UpdateWebSiteDto } from "@templates/application/command/dtos"
import { WebSiteEntity, WebSiteEntityProps } from "@templates/domain/entities/websites"
import { IWebSitesRepository } from "@templates/domain/repositories"

import { InfrastructureInjectionTokens } from "../infrastructure-injection.tokens"
import { WebsiteMongooseService } from "../services"

export class WebsiteMongooseRepository implements IWebSitesRepository {
	constructor(
		@Inject(InfrastructureInjectionTokens.WebsiteMongooseService)
		private readonly websiteMongooseService: WebsiteMongooseService
	) {}

	async createWebSite(props: WebSiteEntityProps): Promise<boolean> {
		return await this.websiteMongooseService.create(props)
	}

	async getWebSite(target: string): Promise<WebSiteEntity | null> {
		return await this.websiteMongooseService.getWebSite(target)
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

	async findTemplateIdByCriteria(criteria: string): Promise<string | null> {
		return await this.websiteMongooseService.findTemplateIdByCriteria(criteria)
	}

	async checkIfStoreHasMainWebSite(storeId: number): Promise<boolean> {
		return await this.websiteMongooseService.checkIfStoreHasMainWebSite(storeId)
	}
	async updateWebsiteInfo(_id: string, props: UpdateWebSiteDto): Promise<WebSiteEntity> {
		return await this.websiteMongooseService.update(_id, props)
	}
}
