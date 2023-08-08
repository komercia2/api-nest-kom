import { Inject, Injectable } from "@nestjs/common"
import { DomainNotAvaibleException } from "@templates/domain/exceptions"
import { IWebSitesRepository } from "@templates/domain/repositories"

import { ApplicationInjectionTokens } from "../../application-injection.tokens"

@Injectable()
export class CheckDomainAvailabilityQuery {
	constructor(
		@Inject(ApplicationInjectionTokens.IWebSiteRepository)
		private readonly websiteRepository: IWebSitesRepository
	) {}

	async execute(domain: string) {
		const website = await this.websiteRepository.checkDomainAvailability(domain)
		if (website) throw new DomainNotAvaibleException("Domain not available")
		return true
	}
}
