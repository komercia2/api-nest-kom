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
		const productInfoQueryBuilder = this.storeInfoRepository
			.createQueryBuilder("tiendas")
			.innerJoin("tiendas.tiendasInfo", "tiendasInfo")
			.leftJoin("tiendas.tiendasPages", "tiendasPages")
			.leftJoin("tiendas.redes", "redes")
			.leftJoin("tiendas.categoria2", "categoria2")
			.leftJoin("tiendasInfo.paises", "paises")
			.leftJoin("tiendas.banners", "banners")
			.leftJoin("tiendas.categoriaProductos", "categoriaProductos")
			.leftJoin("tiendas.subcategorias", "subcategorias")
			.leftJoin("tiendas.geolocalizacions", "geolocalizacions")
			.leftJoin("tiendas.politicas", "politicas")
			.leftJoin("tiendas.medioPagos", "medios_pago")
			.leftJoin("tiendas.mediosEnvios", "medios_envios")
			.leftJoin("tiendas.entidadesTiendas", "pivot")
			.leftJoin("pivot.entidad", "entidades")
			.leftJoin("tiendas.disenoModals", "modal")
			.leftJoin("tiendas.tags", "tags")
			.leftJoin("tags.tagProperties", "properties")
			.leftJoin("tiendas.whatsappCheckouts", "whatsapp_checkout")
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
				"medios_pago.wepay4u",
				"medios_envios.id",
				"medios_envios.valores",
				"medios_envios.estado",
				"medios_envios.idPais",
				"medios_envios.idTienda",
				"medios_envios.createdAt",
				"medios_envios.updatedAt",
				"entidades.id",
				"entidades.nombre",
				"entidades.logo",
				"entidades.createdAt",
				"entidades.updatedAt",
				"pivot.tiendaId",
				"pivot.entidadId",
				"modal.id",
				"modal.title",
				"modal.description",
				"modal.img",
				"modal.password",
				"modal.colorTitle",
				"modal.colorDescription",
				"modal.fontWeighTitle",
				"modal.fontSizeTitle",
				"modal.fontWeighDescription",
				"modal.fontSizeDescription",
				"modal.widthImg",
				"modal.colorTextBtn",
				"modal.colorBgBtn",
				"modal.colorBorder",
				"modal.colorBg_1",
				"modal.colorBg_2",
				"modal.stateModal",
				"modal.marginBottomImg",
				"modal.marginBottomDescription",
				"modal.marginBottomTitle",
				"modal.createdAt",
				"modal.updatedAt",
				"tags.id",
				"tags.name",
				"tags.status",
				"tags.order",
				"tags.tiendasId",
				"tags.createdAt",
				"tags.updatedAt",
				"tags.edit",
				"tags.visible",
				"properties.id",
				"properties.name",
				"properties.status",
				"properties.order",
				"properties.tagId",
				"properties.createdAt",
				"properties.updatedAt",
				"properties.edit",
				"whatsapp_checkout.id",
				"whatsapp_checkout.configuration",
				"whatsapp_checkout.tiendasId",
				"whatsapp_checkout.createdAt",
				"whatsapp_checkout.updatedAt"
			])

		return await productInfoQueryBuilder.getOne()
	}
}
