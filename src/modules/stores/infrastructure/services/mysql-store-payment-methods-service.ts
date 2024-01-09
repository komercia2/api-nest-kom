import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { MedioPagos } from "src/entities"
import { Repository } from "typeorm"

import { StorePaymentMethodsWithoutAuthDto } from "../../domain/dtos"

@Injectable()
export class MySQLStorePaymentMethodsService {
	constructor(
		@InjectRepository(MedioPagos)
		private readonly medioPagosRepository: Repository<MedioPagos>
	) {}

	async getWithoutAuth(storeId: number) {
		const mediosPagos = await this.medioPagosRepository.findOne({
			where: { idMedios2: { id: storeId } },
			relations: {
				idMedios2: {
					tiendaConsignacionInfos: true,
					politicas: true,
					tiendaEfectyInfos: true,
					tiendaNequiInfos: true,
					tiendaDaviplataInfos: true
				}
			}
		})

		console.log(mediosPagos)

		return StorePaymentMethodsWithoutAuthDto.fromPersistence({
			...mediosPagos,
			consignacion: mediosPagos?.idMedios2.tiendaConsignacionInfos[0] ?? null,
			politica_envios: mediosPagos?.idMedios2.politicas.envios ?? null,
			politica_pagos: mediosPagos?.idMedios2.politicas.pagos ?? null,
			nequi: mediosPagos?.idMedios2.tiendaNequiInfos[0] ?? null,
			daviplata: mediosPagos?.idMedios2.tiendaDaviplataInfos[0] ?? null,
			efecty: mediosPagos?.idMedios2.tiendaEfectyInfos[0] ?? null
		})
	}
}
