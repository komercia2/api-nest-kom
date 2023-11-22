import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Politicas } from "src/entities"
import { Repository } from "typeorm"

import { StorePoliciesEntity } from "../../domain/entities"

@Injectable()
export class MySQLStorePoliciesService {
	constructor(
		@InjectRepository(Politicas)
		private readonly storePoliciesRepository: Repository<Politicas>
	) {}

	async getStorePolicies(idTienda: number) {
		const policies = await this.storePoliciesRepository
			.createQueryBuilder("politicas")
			.where("politicas.idTienda = :idTienda", { idTienda })
			.select([
				"politicas.idTienda",
				"politicas.envios",
				"politicas.pagos",
				"politicas.createdAt",
				"politicas.updatedAt",
				"politicas.datos",
				"politicas.garantia",
				"politicas.devolucion",
				"politicas.cambio"
			])
			.getOne()

		if (!policies) return null

		return this.toEntity(policies)
	}

	private toEntity = (policies: Politicas): StorePoliciesEntity => ({
		...policies
	})
}
