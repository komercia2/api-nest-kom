import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Entidades } from "src/entities"
import { Repository } from "typeorm"

import { StoreEntitiesEntity } from "../../domain/entities"

@Injectable()
export class MySQLStoreEntitiesService {
	constructor(
		@InjectRepository(Entidades)
		private readonly storeEntitiesRepository: Repository<Entidades>
	) {}

	async getStoreEntities(storeId: number) {
		const entities = await this.storeEntitiesRepository
			.createQueryBuilder("entidades")
			.where("entidades.id = :storeId", { storeId })
			.leftJoinAndSelect("entidades.entidadesTiendas", "entidadesTiendas")
			.select([
				"entidades.id",
				"entidades.nombre",
				"entidades.logo",
				"entidades.createdAt",
				"entidades.updatedAt",
				"entidadesTiendas.id",
				"entidadesTiendas.entidadId"
			])
			.getMany()

		return entities
	}

	toEntity = (entity: Entidades): StoreEntitiesEntity => ({
		...entity
	})
}
