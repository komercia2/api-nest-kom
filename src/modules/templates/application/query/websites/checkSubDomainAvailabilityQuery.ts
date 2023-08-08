import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { SubDomainNotAvaibleException } from "@templates/domain/exceptions"
import { IWebSitesRepository } from "@templates/domain/repositories"

@Injectable()
export class CheckSubDomainAvailabilityQuery {
	constructor(
		@Inject(ApplicationInjectionTokens.IWebSiteRepository)
		private readonly websiteRepository: IWebSitesRepository
	) {}

	async execute(subDomain: string) {
		const website = await this.websiteRepository.checkSubdomainAvailability(subDomain)
		if (!website) throw new SubDomainNotAvaibleException("Subdomain is not avaible. Already in use")

		return true
	}
}
