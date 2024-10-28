import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { IWapiTemplateRepository } from "@templates/domain/repositories"

@Injectable()
export class CreateWapiTemplateCommand {
	constructor(
		@Inject(ApplicationInjectionTokens.IWapiTemplateRepository)
		private readonly wapiTemplateRepository: IWapiTemplateRepository
	) {}

	async execute(storeId: number) {
		return this.wapiTemplateRepository.create(storeId)
	}
}
