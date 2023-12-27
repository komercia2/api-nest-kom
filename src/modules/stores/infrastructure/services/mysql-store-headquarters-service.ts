import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Geolocalizacion } from "src/entities"
import { Repository } from "typeorm"

import { StoreHeadquartersEntity } from "../../domain/entities"

@Injectable()
export class MySQLStoreHeadquartersService {
	constructor(
		@InjectRepository(Geolocalizacion)
		private readonly sequelizeInstance: Repository<Geolocalizacion>
	) {}

	async findById(id: number) {
		const storeHeadquarters = await this.sequelizeInstance.find({
			where: { tienda: id }
		})

		return storeHeadquarters.map((storeHeadquarters) => this.toDomain(storeHeadquarters))
	}

	private toDomain(persistenceObject: Geolocalizacion): StoreHeadquartersEntity {
		const storeHeadquarters = new StoreHeadquartersEntity({
			id: persistenceObject.id,
			ciudad: persistenceObject.ciudad,
			direccion: persistenceObject.direccion,
			latitud: persistenceObject.latitud,
			foto_tienda: persistenceObject.fotoTienda,
			horario: persistenceObject.horario,
			longitud: persistenceObject.longitud,
			nombre_sede: persistenceObject.nombreSede,
			telefono: persistenceObject.telefono,
			tienda: persistenceObject.tienda
		})

		return storeHeadquarters
	}
}
