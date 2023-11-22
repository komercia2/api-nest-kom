import { Inject, Injectable } from "@nestjs/common"

import { IStoreBlogRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class GetStoreBlogByIdQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreBlogRepository)
		private readonly storeBlogRepository: IStoreBlogRepository
	) {}

	async execute(storeId: number, storeBlogId: number) {
		return await this.storeBlogRepository.getStoreBlogById(storeId, storeBlogId)
	}
}
