import { IWebSitesRepository } from "@templates/domain/repositories"

export class FindMySQLTemplateByCriteriaQuery {
	constructor(private readonly websiteRepository: IWebSitesRepository) {}

	async execute(criteria: string, isDomain: boolean) {
		return await this.websiteRepository.findMySQLTemplateByCriteria(criteria, isDomain)
	}
}
