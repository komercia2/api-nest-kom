import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { ITemplate6Repository } from "@templates/domain/repositories"

@Injectable()
export class CreateTemplate6Command {
	constructor(
		@Inject(ApplicationInjectionTokens.ITemplate6Repository)
		private readonly template6Repository: ITemplate6Repository
	) {}

	public async execute(storeId: number) {
		return await this.template6Repository.create(storeId)
	}
}
