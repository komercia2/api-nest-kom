import { Inject, Injectable } from "@nestjs/common"
import { Template15 } from "@templates/domain/entities/template15"
import { ITemplate15Repository } from "@templates/domain/repositories"

import { ApplicationInjectionTokens } from "../application-injection.tokens"
import { TemplateNotUpdatedException } from "../exceptions"

@Injectable()
export class UpdateTemplate15Command {
	constructor(
		@Inject(ApplicationInjectionTokens.ITemplate15Repository)
		private readonly template15Repository: ITemplate15Repository
	) {}

	async execute(storeId: number, template15: Template15) {
		const isTemplateUpdated = await this.template15Repository.update(storeId, template15)

		if (!isTemplateUpdated)
			throw new TemplateNotUpdatedException("Changes not detected to update template 15")

		return isTemplateUpdated
	}
}
