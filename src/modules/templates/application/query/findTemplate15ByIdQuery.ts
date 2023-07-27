import { Inject, Injectable } from "@nestjs/common"
import { TemplateNotFoundException } from "@templates/application/exceptions"
import { ITemplate15Repository } from "@templates/domain/repositories"

import { ApplicationInjectionTokens } from "../application-injection.tokens"

@Injectable()
export class FindTemplate15ByIdQuery {
	constructor(
		@Inject(ApplicationInjectionTokens.ITemplate15Repository)
		private readonly template15Repository: ITemplate15Repository
	) {}

	execute = async (storeId: number) => {
		const template = await this.template15Repository.findById(storeId)

		if (!template) throw new TemplateNotFoundException("Template15 not found with the given id")

		return template
	}
}
