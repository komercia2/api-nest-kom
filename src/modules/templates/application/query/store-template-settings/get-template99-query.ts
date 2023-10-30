import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { ITemplate99Repository } from "@templates/domain/repositories"

@Injectable()
export class GetTemplate99Query {
	constructor(
		@Inject(ApplicationInjectionTokens.ITemplate99Repository)
		private readonly storeTemplateSettingsRepository: ITemplate99Repository
	) {}

	async execute(storeId: string) {
		return await this.storeTemplateSettingsRepository.getTemplate99Settings(storeId)
	}
}
