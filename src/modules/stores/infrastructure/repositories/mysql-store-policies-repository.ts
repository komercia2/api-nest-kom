import { Inject } from "@nestjs/common"

import { StorePoliciesEntity } from "../../domain/entities"
import { IStorePoliciesRepository } from "../../domain/repositories"
import { MySQLStorePoliciesService } from "../services"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MySQLStorePoliciesRepository implements IStorePoliciesRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MySQLStorePoliciesService)
		private readonly mySQLStorePoliciesService: MySQLStorePoliciesService
	) {}

	async getStorePolicies(idTienda: number): Promise<StorePoliciesEntity | null> {
		return this.mySQLStorePoliciesService.getStorePolicies(idTienda)
	}
}
