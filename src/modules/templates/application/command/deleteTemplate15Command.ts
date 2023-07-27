import { Inject, Injectable } from "@nestjs/common"
import { ITemplate15Repository } from "@templates/domain/repositories"

import { ApplicationInjectionTokens } from "../application-injection.tokens"
import { Tempalte15NotRemovedException } from "../exceptions"

@Injectable()
export class DeleteTemplate15Command {
	constructor(
		@Inject(ApplicationInjectionTokens.ITemplate15Repository)
		private readonly template15Repository: ITemplate15Repository
	) {}

	async execute(storeId: number) {
		const isTemplateRemoved = await this.template15Repository.remove(storeId)

		if (!isTemplateRemoved)
			throw new Tempalte15NotRemovedException("Has been an error removing the template15")

		return isTemplateRemoved
	}
}
