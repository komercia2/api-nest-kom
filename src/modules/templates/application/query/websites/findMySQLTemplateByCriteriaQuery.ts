import { IWebSitesRepository } from "@templates/domain/repositories"

export class FindMySQLTemplateByCriteriaQuery {
	constructor(private readonly websiteRepository: IWebSitesRepository) {}

	async execute(criteria: string) {
		return await this.websiteRepository.findMySQLTemplateByCriteria(criteria)
	}
}
