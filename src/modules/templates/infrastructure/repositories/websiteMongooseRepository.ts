import { Inject } from "@nestjs/common"
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

	getWebSiteByDomain(domain: string): Promise<WebSiteEntity | null> {
		throw new Error("Method not implemented.")
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

	async checkIfStoreHasMainWebSite(storeId: number): Promise<boolean> {
		return await this.websiteMongooseService.checkIfStoreHasMainWebSite(storeId)
	}
}
