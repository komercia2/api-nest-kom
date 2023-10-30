import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Tiendas } from "src/entities"
import { Repository } from "typeorm"

@Injectable()
export class MySQLStoreInfoService {
	constructor(
		@InjectRepository(Tiendas)
		private readonly storeInfoRepository: Repository<Tiendas>
	) {}

	async getStoreInfo(storeId: number) {
		const info = this.storeInfoRepository.findOne({
			where: { id: storeId },
			select: {
				id: true,
				ciudad: true,
				subdominio: true,
				template: true,
				nombre: true,
				logo: true,
				estado: true,
				fechaExpiracion: true,
				tiendasInfo: {
					emailTienda: true,
					dominio: true,
					moneda: true,
					lenguaje: true,
					telefono: true,
					valorCompraMinimo: true,
					descripcion: true
				},
				tiendasPages: {
					mision: true,
					vision: true,
					nosotros: true
				},
				redes: {
					facebook: true,
					instagram: true,
					twitter: true,
					youtube: true,
					tiktok: true,
					whatsapp: true
				},
				categoria2: {
					id: true,
					nombreCategoria: true
				},
				ciudad2: {
					departamento: {
						paisesId: true,
						paises: {
							codigo: true,
							pais: true
						}
					}
				},
				banners: {
					rutaBanner: true,
					titulo: true,
					descripcion: true,
					redireccion: true
				},
				categoriaProductos: {
					id: true,
					nombreCategoriaProducto: true,
					orden: true
				},
				subcategorias: {
					id: true,
					nombreSubcategoria: true,
					categoria: true,
					imagenCloudinary: true
				},
				geolocalizacions: {
					id: true,
					nombreSede: true,
					tienda: true,
					direccion: true,
					latitud: true,
					longitud: true,
					ciudad: true
				}
			}
		})
	}
}
