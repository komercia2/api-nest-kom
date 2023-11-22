import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { ITemplate5Repository } from "@templates/domain/repositories"

@Injectable()
export class GetTemplate5Query {
	constructor(
		@Inject(ApplicationInjectionTokens.ITemplate5Repository)
		private readonly storeTemplateSettingsRepository: ITemplate5Repository
	) {}

	async execute(storeId: string) {
		return await this.storeTemplateSettingsRepository.getTemplate5Settings(storeId)
	}
}
