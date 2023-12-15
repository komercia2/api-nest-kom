import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { MediosEnvios } from "src/entities"
import { Repository } from "typeorm"

import { StoreShippingMeanEntity } from "../../domain/entities"

@Injectable()
export class MysqlStoreShippingMeansService {
	private baseShippingMeanInfo = {
		gratis: true,
		tarifa_plana: true,
		peso: false,
		precio: false
	}

	constructor(
		@InjectRepository(MediosEnvios) private repositoryShippingMeans: Repository<MediosEnvios>
	) {}

	async getStoreShippingMeans(storeId: number) {
		const shippingMeanInfo = await this.repositoryShippingMeans.findOne({
			where: { idTienda: storeId },
			relations: {
				idTienda2: {
					zonas: { zonasPaths: true, ciudades: { departamento: true } }
				}
			}
		})

		if (!shippingMeanInfo) {
			return new StoreShippingMeanEntity({
				medios: {
					...this.baseShippingMeanInfo,
					zonas: []
				},
				informacion: []
			})
		}
		return this.shippingMeansToEntity(shippingMeanInfo)
	}

	private shippingMeansToEntity(mediosEnvios: MediosEnvios): StoreShippingMeanEntity {
		return new StoreShippingMeanEntity({
			medios: {
				...this.baseShippingMeanInfo,
				zonas: mediosEnvios.idTienda2.zonas.map((zones) => ({
					id: zones.id,
					ciudades_id: zones.ciudadesId,
					tiendas_id: zones.tiendasId,
					ciudad: {
						id: zones.ciudades.id,
						codigo_dane: zones.ciudades.codigoDane,
						dep: zones.ciudades.dep,
						nombre_ciu: zones.ciudades.nombreCiu,
						departamento: {
							id: zones.ciudades.departamento.id,
							nombre_dep: zones.ciudades.departamento.nombreDep,
							paises_id: zones.ciudades.departamento.paisesId
						}
					},
					paths: zones.zonasPaths.map(({ lat, lng }) => ({ lat, lng })),
					delivery_time: zones.deliveryTime,
					name: zones.name,
					price: zones.price
				}))
			},
			informacion: [
				{
					estado: mediosEnvios.estado,
					id: mediosEnvios.id,
					id_pais: mediosEnvios.idPais,
					id_tienda: mediosEnvios.idTienda,
					valores: mediosEnvios.valores
				}
			]
		})
	}
}
