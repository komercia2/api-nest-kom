import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Geolocalizacion } from "src/entities"
import { Repository } from "typeorm"

import { StoreGeolocationEntity } from "../../domain/entities"

@Injectable()
export class MySQLStoreGeolocationService {
	constructor(
		@InjectRepository(Geolocalizacion)
		private readonly geolocationRepository: Repository<Geolocalizacion>
	) {}

	async getStoreGeolocations(storeId: number) {
		const geolocations = await this.geolocationRepository
			.createQueryBuilder("geolocalizacion")
			.where("geolocalizacion.tienda = :storeId", { storeId })
			.select([
				"geolocalizacion.id",
				"geolocalizacion.nombreSede",
				"geolocalizacion.tienda",
				"geolocalizacion.direccion",
				"geolocalizacion.latitud",
				"geolocalizacion.longitud",
				"geolocalizacion.ciudad",
				"geolocalizacion.horario",
				"geolocalizacion.fotoTienda",
				"geolocalizacion.createdAt",
				"geolocalizacion.updatedAt",
				"geolocalizacion.telefono"
			])
			.getMany()

		return geolocations.map(this.toEntity)
	}

	toEntity = (geolocation: Geolocalizacion): StoreGeolocationEntity => ({
		...geolocation
	})
}
