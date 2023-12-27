import { Inject, Injectable } from "@nestjs/common"

import { IStoreHeadquartersRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class FindStoreHeadquartersQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreHeadquartersRepository)
		private readonly storeHeadquartersRepository: IStoreHeadquartersRepository
	) {}

	async execute(id: number) {
		return await this.storeHeadquartersRepository.findById(id)
	}
}
