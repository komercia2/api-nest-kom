import { Inject } from "@nestjs/common"
import { ITemplate15Repository } from "@templates/domain/repositories"

import { ApplicationInjectionTokens } from "../application-injection.tokens"
import { TemplateAlreadyExistsException } from "../exceptions"

export class CreateTemplate15Command {
	constructor(
		@Inject(ApplicationInjectionTokens.ITemplate15Repository)
		private repository: ITemplate15Repository
	) {}

	async execute({ storeId }: { storeId: number }) {
		const template = await this.repository.findById(storeId)

		if (template)
			throw new TemplateAlreadyExistsException(`Template15 with id ${storeId} already exists`)

		return await this.repository.create(storeId)
	}
}
