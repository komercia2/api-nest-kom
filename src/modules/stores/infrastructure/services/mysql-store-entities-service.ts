import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { EntidadesTiendas } from "src/entities"
import { Repository } from "typeorm"

import { StoreEntitiesEntity, StoreEntitiesStoresEntity } from "../../domain/entities"

@Injectable()
export class MySQLStoreEntitiesService {
	constructor(
		@InjectRepository(EntidadesTiendas)
		private readonly storeEntitiesRepository: Repository<EntidadesTiendas>
	) {}

	async getStoreEntities(storeId: number) {
		const entities = await this.storeEntitiesRepository.find({
			where: { tiendaId: storeId },
			relations: ["entidad"],
			select: {
				entidad: {
					id: true,
					nombre: true,
					logo: true,
					createdAt: true,
					updatedAt: true
				},
				tiendaId: true,
				entidadId: true
			}
		})

		return entities.map(this.toEntity)
	}

	toEntity = (entity: EntidadesTiendas): StoreEntitiesEntity => ({
		...entity.entidad,
		entidadesTiendas: new StoreEntitiesStoresEntity({
			...entity
		})
	})
}
