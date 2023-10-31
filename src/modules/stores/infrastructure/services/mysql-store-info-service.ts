import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Tiendas } from "src/entities"
import { Repository, SelectQueryBuilder } from "typeorm"

@Injectable()
export class MySQLStoreInfoService {
	constructor(
		@InjectRepository(Tiendas)
		private readonly storeInfoRepository: Repository<Tiendas>
	) {}

	async getStoreInfo(storeId: number) {
		const query: SelectQueryBuilder<Tiendas> = this.storeInfoRepository
			.createQueryBuilder("tiendas")
			.leftJoinAndSelect("tiendas.tiendasInfo", "tiendasInfo")
			.leftJoinAndSelect("tiendas.tiendasPages", "tiendasPages")
			.leftJoinAndSelect("tiendas.redes", "redes")
			.leftJoinAndSelect("tiendas.categoria2", "categoria2")
			.leftJoinAndSelect("tiendasInfo.paises", "paises")
			.leftJoinAndSelect("tiendas.banners", "banners")
			.leftJoinAndSelect("tiendas.categoriaProductos", "categoriaProductos")
			.leftJoinAndSelect("tiendas.subcategorias", "subcategorias")
			.leftJoinAndSelect("tiendas.geolocalizacions", "geolocalizacions")
			.leftJoinAndSelect("tiendas.politicas", "politicas")
			.leftJoinAndSelect("tiendas.medioPagos", "medios_pago")
			.where("tiendas.id = :storeId", { storeId })
			.select([
				"tiendas.id",
				"tiendas.ciudad",
				"tiendas.subdominio",
				"tiendas.template",
				"tiendas.nombre",
				"tiendas.logo",
				"tiendas.estado",
				"tiendas.fechaExpiracion",
				"tiendasInfo.emailTienda",
				"tiendasInfo.dominio",
				"tiendasInfo.moneda",
				"tiendasInfo.lenguaje",
				"tiendasInfo.telefono",
				"tiendasInfo.valorCompraMinimo",
				"tiendasInfo.descripcion",
				"tiendasPages.mision",
				"tiendasPages.vision",
				"tiendasPages.nosotros",
				"redes.facebook",
				"redes.instagram",
				"redes.twitter",
				"redes.youtube",
				"redes.tiktok",
				"redes.whatsapp",
				"categoria2.id",
				"categoria2.nombreCategoria",
				"paises.id",
				"paises.codigo",
				"paises.pais",
				"banners.rutaBanner",
				"banners.titulo",
				"banners.descripcion",
				"banners.redireccion",
				"categoriaProductos.id",
				"categoriaProductos.nombreCategoriaProducto",
				"categoriaProductos.imagenCloudinary",
				"categoriaProductos.orden",
				"subcategorias.id",
				"subcategorias.nombreSubcategoria",
				"subcategorias.categoria",
				"subcategorias.imagenCloudinary",
				"geolocalizacions.id",
				"geolocalizacions.nombreSede",
				"geolocalizacions.tienda",
				"geolocalizacions.direccion",
				"geolocalizacions.latitud",
				"geolocalizacions.longitud",
				"geolocalizacions.ciudad",
				"geolocalizacions.horario",
				"geolocalizacions.fotoTienda",
				"geolocalizacions.createdAt",
				"geolocalizacions.updatedAt",
				"geolocalizacions.telefono",
				"politicas.idTienda",
				"politicas.envios",
				"politicas.pagos",
				"politicas.createdAt",
				"politicas.updatedAt",
				"politicas.datos",
				"politicas.garantia",
				"politicas.devolucion",
				"politicas.cambio",
				"medios_pago.idMedios",
				"medios_pago.convenir",
				"medios_pago.consignacion",
				"medios_pago.payu",
				"medios_pago.payco",
				"medios_pago.paypal",
				"medios_pago.efecty",
				"medios_pago.tienda",
				"medios_pago.politicaEnvios",
				"medios_pago.politicaPagos",
				"medios_pago.createdAt",
				"medios_pago.updatedAt",
				"medios_pago.contraentrega",
				"medios_pago.mercadoPago",
				"medios_pago.nequi",
				"medios_pago.daviplata",
				"medios_pago.wompi",
				"medios_pago.credibanco",
				"medios_pago.flow",
				"medios_pago.paymentsWay",
				"medios_pago.tuCompra",
				"medios_pago.wepay4u"
			])

		const info = await query.getOne()

		return info
	}
}
