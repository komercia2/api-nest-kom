import { Inject } from "@nestjs/common"

import { StoreHeadquartersEntity } from "../../domain/entities"
import { IStoreHeadquartersRepository } from "../../domain/repositories"
import { MySQLStoreHeadquartersService } from "../services"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MySQLStoreHeadquartersRepository implements IStoreHeadquartersRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MySQLStoreHeadquartersService)
		private readonly mySQLStoreHeadquartersService: MySQLStoreHeadquartersService
	) {}

	async findById(id: number): Promise<StoreHeadquartersEntity[]> {
		return await this.mySQLStoreHeadquartersService.findById(id)
	}
}
