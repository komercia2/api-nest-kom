import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Parser } from "json2csv"
import { Logger } from "nestjs-pino"
import {
	Carritos,
	CategoriaProductos,
	Clientes,
	Cupones,
	CustomerAccessCode,
	DeliveryStatus,
	DescuentoRango,
	DisenoModal,
	Geolocalizacion,
	Politicas,
	Productos,
	ProductosInfo,
	ProductosVariantesCombinaciones,
	Redes,
	Subcategorias,
	SuscriptoresTienda,
	TemplateWhatsappSettings,
	WhatsappCheckout
} from "src/entities"
import { DataSource, Like, Repository } from "typeorm"

import { prettifyShippingMethod } from "../orders/utils/prettifyShippingMethod"
import { PaginationDto } from "../users/infrastructure/dtos/paginatation.dto"
import { GetProductsDtos } from "./dtos/get-productos.dtos"
import { UpdateProductPricingDto } from "./dtos/update-product-pricing"
import { ICreateProductCategorie } from "./interfaces/categories"
import { ICoupon } from "./interfaces/coupon"
import { ICustomerAccessCode } from "./interfaces/customer-access-code"
import { IDiscount } from "./interfaces/discount"
import { ICreateProductSubcategorie } from "./interfaces/subcategories"
import { IWapiTemplate } from "./interfaces/wapi"
import { IGeolocation } from "./interfaces/zones"
import { mapGeolocation } from "./mappings/geolocation.mapper"
import { mapPolicy } from "./mappings/policie.mapper"

@Injectable()
export class PanelService {
	constructor(
		@InjectRepository(Productos) private productosRepository: Repository<Productos>,
		@InjectRepository(ProductosInfo) private productosInfoRepository: Repository<ProductosInfo>,
		@InjectRepository(DeliveryStatus) private deliveryStatus: Repository<DeliveryStatus>,
		@InjectRepository(Carritos) private carritosRepository: Repository<Carritos>,
		@InjectRepository(Cupones) private cuponesRepository: Repository<Cupones>,
		@InjectRepository(Clientes) private clientesRepository: Repository<Clientes>,
		@InjectRepository(Geolocalizacion) private geoLocationRepository: Repository<Geolocalizacion>,
		@InjectRepository(Politicas) private politicasRepository: Repository<Politicas>,
		@InjectRepository(Redes) private redesRepository: Repository<Redes>,
		@InjectRepository(DescuentoRango) private descuentoRangoRepository: Repository<DescuentoRango>,
		@InjectRepository(CategoriaProductos)
		private categoriasRepository: Repository<CategoriaProductos>,
		@InjectRepository(Subcategorias) private subcategoriasRepository: Repository<Subcategorias>,
		@InjectRepository(TemplateWhatsappSettings)
		private templateWhatsappSettingsRepository: Repository<TemplateWhatsappSettings>,
		@InjectRepository(ProductosVariantesCombinaciones)
		private combinacionesRepository: Repository<ProductosVariantesCombinaciones>,
		@InjectRepository(WhatsappCheckout)
		private whatsappCheckoutRepository: Repository<WhatsappCheckout>,
		@InjectRepository(DisenoModal) private disenoModalRepository: Repository<DisenoModal>,
		@InjectRepository(SuscriptoresTienda)
		private suscriptoresTiendaRepository: Repository<SuscriptoresTienda>,
		@InjectRepository(CustomerAccessCode)
		private customerAccessCode: Repository<CustomerAccessCode>,
		private readonly datasource: DataSource,
		private readonly logger: Logger
	) {}

	async getStoreSubscribers(storeID: number, pagination: PaginationDto) {
		const { page, limit } = pagination

		const offset = (page - 1) * limit

		const [subscribers, total] = await this.suscriptoresTiendaRepository.findAndCount({
			where: { idTienda: storeID },
			skip: offset,
			take: limit,
			order: { createdAt: "DESC" }
		})

		if (subscribers.length === 0) return []

		const mappedSubscriebrs = subscribers.map((subscriber) => ({
			id: subscriber.id,
			email: subscriber.email,
			created_at: subscriber.createdAt
		}))

		return {
			subscribers: mappedSubscriebrs,
			total,
			page: +page,
			last_page: Math.ceil(total / limit),
			limit: +limit,
			has_next_page: total > page * limit,
			has_previous_page: page > 1
		}
	}

	async createCustomerAccessCode(
		storeID: number,
		data: Omit<ICustomerAccessCode, "id" | "tiendasId" | "createdAt" | "updatedAt">
	) {
		const existingCode = await this.customerAccessCode.findOne({
			where: { accessCode: data.access_code, tiendasId: storeID }
		})

		if (existingCode) throw new BadRequestException("Access code already exists")

		const newAccessCode = new CustomerAccessCode()
		newAccessCode.userCode = data.user_code
		newAccessCode.userName = data.user_name
		newAccessCode.userEmail = data.user_email
		newAccessCode.accessCode = data.access_code
		newAccessCode.status = data.status
		newAccessCode.tiendasId = storeID
		newAccessCode.createdAt = new Date()
		newAccessCode.updatedAt = new Date()

		return this.customerAccessCode.save(newAccessCode)
	}

	async deleteCustomerAccessCode(storeID: number, codeID: string): Promise<void> {
		const accessCode = await this.customerAccessCode.findOne({
			where: { id: codeID, tiendasId: storeID }
		})

		if (!accessCode) throw new NotFoundException("Access code not found")

		await this.customerAccessCode.remove(accessCode)
	}

	async updateCustomerAccessCode(
		storeID: number,
		codeID: string,
		data: Partial<Omit<ICustomerAccessCode, "id" | "tiendasId">>
	) {
		const accessCode = await this.customerAccessCode.findOne({
			where: { id: codeID, tiendasId: storeID }
		})

		if (!accessCode) throw new NotFoundException("Access code not found")

		Object.assign(accessCode, {
			userCode: data.user_code ?? accessCode.userCode,
			userName: data.user_name ?? accessCode.userName,
			userEmail: data.user_email ?? accessCode.userEmail,
			accessCode: data.access_code ?? accessCode.accessCode,
			status: data.status ?? accessCode.status,
			tiendasId: storeID,
			updatedAt: new Date()
		})

		return this.customerAccessCode.save(accessCode)
	}

	async getCustomerAccessCode(storeID: number): Promise<ICustomerAccessCode[]> {
		const accessCode = await this.customerAccessCode.find({
			where: { tiendasId: storeID },
			order: { createdAt: "DESC" }
		})

		if (!accessCode) throw new NotFoundException("Access code not found")

		return accessCode.map((code) => ({
			id: code.id,
			user_code: code.userCode ?? "",
			user_name: code.userName,
			user_email: code.userEmail ?? "",
			access_code: code.accessCode,
			status: code.status,
			tiendas_id: code.tiendasId,
			created_at: code.createdAt ?? new Date(),
			updated_at: code.updatedAt ?? new Date()
		}))
	}

	async updateSecurityModalSettings(
		storeID: number,
		data: Partial<Omit<DisenoModal, "tiendasId" | "id">>
	) {
		const modal = await this.disenoModalRepository.findOne({
			where: { tiendasId: storeID }
		})

		if (!modal) throw new NotFoundException("Security modal not found")

		Object.assign(modal, {
			...data,
			updatedAt: new Date()
		})

		return this.disenoModalRepository.save(modal)
	}

	async getSecurityModalSettings(storeID: number) {
		const modal = await this.disenoModalRepository.findOne({
			where: { tiendasId: storeID }
		})

		if (!modal) throw new NotFoundException("Security modal not found")

		return modal
	}

	async deleteDiscount(storeID: number, discountID: string): Promise<void> {
		const discount = await this.descuentoRangoRepository.findOne({
			where: { id: discountID, tiendasId: storeID }
		})

		if (!discount) throw new NotFoundException("Discount not found")

		await this.descuentoRangoRepository.remove(discount)
	}

	async updateDiscount(storeID: number, discountID: string, data: IDiscount) {
		const discount = await this.descuentoRangoRepository.findOne({
			where: { id: discountID, tiendasId: storeID }
		})

		if (!discount) throw new NotFoundException("Discount not found")

		discount.nombre = data.nombre ?? discount.nombre
		discount.porcentajeDescuento = data.porcentaje_descuento ?? discount.porcentajeDescuento
		discount.valorDescuento = data.valor_descuento ?? discount.valorDescuento
		discount.cantidadProductos = data.cantidad_productos ?? discount.cantidadProductos
		discount.tipo = data.tipo ?? discount.tipo
		discount.rangosPrecios = data.rangos_precios ?? discount.rangosPrecios
		discount.opcion = data.opcion ?? discount.opcion
		discount.estado = data.estado ?? discount.estado
		discount.updatedAt = new Date()

		const updated = await this.descuentoRangoRepository.save(discount)

		return {
			id: updated.id,
			nombre: updated.nombre,
			porcentaje_descuento: updated.porcentajeDescuento,
			valor_descuento: updated.valorDescuento,
			cantidad_productos: updated.cantidadProductos,
			tiendas_id: updated.tiendasId,
			created_at: updated.createdAt,
			updated_at: updated.updatedAt,
			tipo: !!updated.tipo,
			rangos_precios: updated.rangosPrecios,
			opcion: updated.opcion,
			estado: !!updated.estado
		}
	}

	async createDiscount(storeID: number, data: IDiscount) {
		const newDiscount = this.descuentoRangoRepository.create({
			nombre: data.nombre,
			porcentajeDescuento: data.porcentaje_descuento,
			valorDescuento: data.valor_descuento,
			cantidadProductos: data.cantidad_productos,
			tiendasId: storeID,
			tipo: data.tipo,
			rangosPrecios: data.rangos_precios,
			opcion: data.opcion,
			estado: data.estado,
			createdAt: new Date(),
			updatedAt: new Date()
		})

		return await this.descuentoRangoRepository.save(newDiscount)
	}

	async getDiscountList(storeID: number) {
		const discounts = await this.descuentoRangoRepository.find({
			where: { tiendasId: storeID },
			order: { createdAt: "DESC" }
		})

		if (discounts.length === 0) return []

		return discounts.map((discount) => ({
			id: discount.id,
			nombre: discount.nombre,
			porcentaje_descuento: discount.porcentajeDescuento,
			valor_descuento: discount.valorDescuento,
			cantidad_productos: discount.cantidadProductos,
			tiendas_id: discount.tiendasId,
			created_at: discount.createdAt,
			updated_at: discount.updatedAt,
			tipo: discount.tipo,
			rangos_precios: discount.rangosPrecios,
			opcion: discount.opcion,
			estado: discount.estado
		}))
	}

	async deleteCoupon(storeID: number, couponID: string): Promise<void> {
		const coupon = await this.cuponesRepository.findOne({
			where: { id: couponID, tiendasId: storeID }
		})

		if (!coupon) throw new NotFoundException("Coupon not found")

		await this.cuponesRepository.remove(coupon)
	}

	async updateCoupon(storeID: number, couponID: string, data: Partial<ICoupon>) {
		const coupon = await this.cuponesRepository.findOne({
			where: { id: couponID, tiendasId: storeID }
		})

		if (!coupon) throw new NotFoundException("Coupon not found")

		coupon.nombre = data.nombre ?? coupon.nombre
		coupon.codigo = data.codigo ?? coupon.codigo
		coupon.estado = data.estado ?? coupon.estado
		coupon.tipo = data.tipo ?? coupon.tipo
		coupon.porcentajeDescuento = data.porcentaje_descuento ?? coupon.porcentajeDescuento
		coupon.valorDescuento = data.valor_descuento ?? coupon.valorDescuento
		coupon.publico = data.publico ?? coupon.publico
		coupon.updatedAt = new Date()

		const updated = await this.cuponesRepository.save(coupon)

		return {
			id: updated.id,
			nombre: updated.nombre,
			codigo: updated.codigo,
			estado: updated.estado,
			tipo: updated.tipo,
			porcentaje_descuento: updated.porcentajeDescuento,
			valor_descuento: updated.valorDescuento,
			tiendas_id: updated.tiendasId,
			deleted_at: updated.deletedAt,
			created_at: updated.createdAt,
			updated_at: updated.updatedAt,
			publico: updated.publico
		}
	}

	async createCoupon(storeID: number, data: ICoupon) {
		const newCoupon = this.cuponesRepository.create({
			nombre: data.nombre,
			codigo: data.codigo,
			estado: data.estado,
			tipo: data.tipo,
			porcentajeDescuento: data.porcentaje_descuento,
			valorDescuento: data.valor_descuento,
			createdAt: new Date(),
			updatedAt: new Date(),
			tiendasId: storeID,
			publico: data.publico
		})

		const saved = await this.cuponesRepository.save(newCoupon)

		return {
			id: saved.id,
			nombre: saved.nombre,
			codigo: saved.codigo,
			estado: saved.estado,
			tipo: saved.tipo,
			porcentaje_descuento: saved.porcentajeDescuento,
			valor_descuento: saved.valorDescuento,
			tiendas_id: saved.tiendasId,
			created_at: saved.createdAt,
			publico: saved.publico
		}
	}

	async getCouponList(storeID: number): Promise<Array<ICoupon>> {
		const coupons = await this.cuponesRepository.find({
			where: { tiendasId: storeID },
			order: { createdAt: "DESC" }
		})

		if (coupons.length === 0) return []

		return coupons.map((coupon) => ({
			id: coupon.id,
			nombre: coupon.nombre,
			codigo: coupon.codigo,
			estado: coupon.estado,
			tipo: coupon.tipo,
			porcentaje_descuento: coupon.porcentajeDescuento,
			valor_descuento: coupon.valorDescuento,
			tiendas_id: coupon.tiendasId,
			deleted_at: coupon.deletedAt,
			created_at: coupon.createdAt,
			updated_at: coupon.updatedAt,
			publico: coupon.publico
		}))
	}

	async updateWhatsappCheckoutDynamicSettings(storeID: number, configuration: string) {
		const settings = await this.whatsappCheckoutRepository.findOne({
			where: { tiendasId: storeID }
		})

		if (!settings) throw new NotFoundException("Whatsapp dynamic checkout settings not found")

		settings.configuration = configuration

		return this.whatsappCheckoutRepository.save(settings)
	}

	async getWhatsappCheckoutDynamicSettings(storeID: number) {
		const settings = await this.whatsappCheckoutRepository.findOne({
			where: { tiendasId: storeID }
		})

		if (!settings) throw new NotFoundException("Whatsapp dynamic checkout settings not found")

		return {
			id: settings.id,
			configuration: settings.configuration,
			tiendas_id: settings.tiendasId,
			created_at: settings.createdAt,
			updated_at: settings.updatedAt
		}
	}

	async updateWapiSettings(storeID: number, data: IWapiTemplate) {
		const settings = await this.templateWhatsappSettingsRepository.findOne({
			where: { tiendasId: storeID }
		})

		if (!settings) throw new NotFoundException("Wapi settings not found")

		settings.banner = data.banner
		settings.descripcion = data.descripcion
		settings.logoCuadrado = data.logo_cuadrado
		settings.colorPrimario = data.color_primario
		settings.colorSecundario = data.color_secundario
		settings.colorIcon = data.color_icon
		settings.tema = data.tema
		settings.pagoOnline = data.pago_online
		settings.mensajePrincipal = data.mensaje_principal
		settings.estiloProductos = data.estilo_productos
		settings.estiloCategorias = data.estilo_categorias
		settings.watermark = data.watermark
		settings.stateSubcategorias = data.state_subcategorias

		return this.templateWhatsappSettingsRepository.save(settings)
	}

	async getWapiSettings(storeID: number): Promise<IWapiTemplate> {
		const settings = await this.templateWhatsappSettingsRepository.findOne({
			where: { tiendasId: storeID }
		})

		if (!settings) throw new NotFoundException("Wapi settings not found")

		return {
			id: settings.id,
			banner: settings.banner,
			descripcion: settings.descripcion,
			logo_cuadrado: settings.logoCuadrado,
			color_primario: settings.colorPrimario,
			color_secundario: settings.colorSecundario,
			color_icon: settings.colorIcon,
			tema: settings.tema,
			pago_online: settings.pagoOnline,
			mensaje_principal: settings.mensajePrincipal,
			estilo_productos: settings.estiloProductos,
			estilo_categorias: settings.estiloCategorias,
			watermark: settings.watermark,
			state_subcategorias: settings.stateSubcategorias
		}
	}

	async updateProductState(storeID: number, id: number, state: boolean) {
		const product = await this.productosRepository.findOne({
			where: { id, tienda: storeID }
		})

		if (!product) throw new NotFoundException("Product not found")

		product.activo = state

		await this.productosRepository.save(product)
	}

	async editProductSubcategory(
		storeID: number,
		subcategoryID: number,
		dto: ICreateProductSubcategorie
	) {
		const subcategory = await this.subcategoriasRepository.findOne({
			where: { id: subcategoryID, tienda: storeID }
		})

		if (!subcategory) throw new NotFoundException("Subcategory not found")

		subcategory.nombreSubcategoria = dto.nombre_subcategoria
		subcategory.categoria = dto.categoria_producto
		subcategory.idCloudinary = dto.id_cloudinary
		subcategory.imagenCloudinary = dto.imagen_cloudinary

		await this.subcategoriasRepository.save(subcategory)
	}

	async editProductCategory(storeID: number, categoryID: number, dto: ICreateProductCategorie) {
		const category = await this.categoriasRepository.findOne({
			where: { id: categoryID, tienda: storeID }
		})

		if (!category) throw new NotFoundException("Category not found")

		category.nombreCategoriaProducto = dto.nombre_categoria_producto
		category.descripcion = dto.descripcion
		category.fotoBanner = dto.foto_banner
		category.orden = dto.orden
		category.fotoIcono = dto.foto_icono
		category.idCloudinary = dto.id_cloudinary
		category.imagenCloudinary = dto.imagen_cloudinary

		await this.categoriasRepository.save(category)
	}

	async deleteProductSubcategory(storeID: number, subcategoryID: number) {
		const subcategory = await this.subcategoriasRepository.findOne({
			where: { id: subcategoryID, tienda: storeID }
		})

		if (!subcategory) throw new NotFoundException("Subcategory not found")

		await this.subcategoriasRepository.delete({ id: subcategoryID, tienda: storeID })
	}

	async createProductSubcategory(storeID: number, dto: ICreateProductSubcategorie) {
		const existingSubcategory = await this.subcategoriasRepository.findOne({
			where: {
				nombreSubcategoria: dto.nombre_subcategoria,
				tienda: storeID,
				categoria: dto.categoria_producto
			}
		})

		if (existingSubcategory) throw new BadRequestException("Subcategory already exists")

		const newSubcategory = this.subcategoriasRepository.create({
			nombreSubcategoria: dto.nombre_subcategoria,
			categoria: dto.categoria_producto,
			tienda: storeID,
			idCloudinary: dto.id_cloudinary,
			imagenCloudinary: dto.imagen_cloudinary
		})

		await this.subcategoriasRepository.save(newSubcategory)
	}

	async deleteProductCategory(storeID: number, categoryID: number) {
		const category = await this.categoriasRepository.findOne({
			where: { id: categoryID, tienda: storeID }
		})

		if (!category) throw new NotFoundException("Category not found")

		await this.categoriasRepository.delete({ id: categoryID, tienda: storeID })
	}

	async createProductCategory(storeID: number, dto: ICreateProductCategorie) {
		const existingCategory = await this.categoriasRepository.findOne({
			where: { nombreCategoriaProducto: dto.nombre_categoria_producto, tienda: storeID }
		})

		if (existingCategory) throw new BadRequestException("Category already exists")

		const newCategory = this.categoriasRepository.create({
			nombreCategoriaProducto: dto.nombre_categoria_producto,
			tienda: storeID,
			descripcion: dto.descripcion,
			fotoBanner: dto.foto_banner,
			orden: dto.orden,
			fotoIcono: dto.foto_icono,
			idCloudinary: dto.id_cloudinary,
			imagenCloudinary: dto.imagen_cloudinary
		})

		await this.categoriasRepository.save(newCategory)
	}

	async getProductCategoriesAndSubcategories(storeId: number) {
		const categories = await this.categoriasRepository.query(
			`
			SELECT
			  cp.id,
			  cp.nombre_categoria_producto AS nombre_categoria_producto,
			  cp.tienda,
			  cp.descripcion,
			  cp.foto_banner AS foto_banner,
			  cp.orden,
			  cp.foto_icono AS foto_icono,
			  cp.id_cloudinary AS id_cloudinary,
			  cp.imagen_cloudinary AS imagen_cloudinary,
			  COUNT(p.id) AS producto_count
			FROM
			  komercia_prod.categoria_productos cp
			LEFT JOIN
			  komercia_prod.productos p
			  ON cp.id = p.categoria_producto
			WHERE
			  cp.tienda = ?
			GROUP BY
			  cp.id
			ORDER BY
			  cp.orden DESC
			`,
			[storeId]
		)

		const subcategories = await this.subcategoriasRepository.query(
			`
			SELECT
				s.id,
				s.nombre_subcategoria AS nombre_subcategoria,
				s.categoria,
				s.tienda,
				s.id_cloudinary AS id_cloudinary,
				s.imagen_cloudinary AS imagen_cloudinary,
				COUNT(p.id) AS producto_count
			FROM
				komercia_prod.subcategorias s
			LEFT JOIN
				komercia_prod.productos p ON s.id = p.subcategoria
			WHERE
				s.tienda = ?
			GROUP BY
				s.id
			`,
			[storeId]
		)

		return {
			categories,
			subcategories
		}
	}

	async editPaymentPolicies(storeID: number, pagos: string) {
		const policies = await this.politicasRepository.findOne({
			where: { idTienda: +storeID }
		})

		if (!policies) throw new NotFoundException("Policies not found")

		policies.pagos = pagos
		policies.updatedAt = new Date()

		await this.politicasRepository.save(policies)
	}

	async getPaymentPolcie(storeID: number) {
		return await this.politicasRepository.findOne({
			where: { idTienda: storeID },
			select: { pagos: true }
		})
	}

	async editNetworks(storeID: number, redesData: Partial<Redes>) {
		const redes = await this.redesRepository.findOne({
			where: { id: storeID }
		})

		if (!redes) throw new NotFoundException("Networks not found")

		redes.facebook = redesData?.facebook ?? redes.facebook
		redes.instagram = redesData?.instagram ?? redes.instagram
		redes.twitter = redesData?.twitter ?? redes.twitter
		redes.youtube = redesData?.youtube ?? redes.youtube
		redes.whatsapp = redesData?.whatsapp ?? redes.whatsapp
		redes.tiktok = redesData?.tiktok ?? redes.tiktok

		await this.redesRepository.save(redes)
	}

	async getNetworks(storeID: number) {
		const networks = await this.redesRepository.findOne({
			where: { id: storeID }
		})

		if (!networks) throw new NotFoundException("Networks not found")

		return networks
	}

	async editPolicies(storeID: number, policiesData: Partial<Politicas>) {
		const policies = await this.politicasRepository.findOne({
			where: { idTienda: storeID }
		})
		if (!policies) throw new NotFoundException("Policies not found")
		policies.envios = policiesData?.envios ?? policies.envios
		policies.pagos = policiesData?.pagos ?? policies.pagos
		policies.datos = policiesData?.datos ?? policies.datos
		policies.garantia = policiesData?.garantia ?? policies.garantia
		policies.devolucion = policiesData?.devolucion ?? policies.devolucion
		policies.cambio = policiesData?.cambio ?? policies.cambio
		policies.updatedAt = new Date()

		await this.politicasRepository.save(policies)
	}

	async getPolicies(storeID: number) {
		const policie = await this.politicasRepository.findOne({
			where: { idTienda: storeID }
		})

		if (!policie) throw new NotFoundException("Policies not found")

		return mapPolicy(policie)
	}

	async deleteGeolocation(storeID: number, geolocationID: number) {
		const geolocation = await this.geoLocationRepository.findOne({
			where: { id: geolocationID, tienda: +storeID }
		})
		if (!geolocation) throw new NotFoundException("Geolocation not found")
		await this.geoLocationRepository.delete({ id: geolocationID, tienda: +storeID })
	}

	async createGeolocation(storeID: number, geolocationData: IGeolocation) {
		const geolocation = this.geoLocationRepository.create({
			nombreSede: geolocationData.nombre_sede,
			direccion: geolocationData.direccion,
			latitud: geolocationData.latitud,
			longitud: geolocationData.longitud,
			ciudad: geolocationData.ciudad,
			horario: geolocationData.horario,
			fotoTienda: geolocationData.foto_tienda,
			telefono: geolocationData.telefono,
			createdAt: new Date(),
			tienda: storeID
		})
		await this.geoLocationRepository.save(geolocation)
	}

	async editGeolocation(
		storeID: number,
		geolocationID: number,
		geolocationData: Partial<IGeolocation>
	) {
		const geolocation = await this.geoLocationRepository.findOne({
			where: { id: geolocationID, tienda: +storeID }
		})

		if (!geolocation) throw new NotFoundException("Geolocation not found")

		geolocation.nombreSede = geolocationData?.nombre_sede ?? geolocation.nombreSede
		geolocation.direccion = geolocationData?.direccion ?? geolocation.direccion
		geolocation.latitud = geolocationData?.latitud ?? geolocation.latitud
		geolocation.longitud = geolocationData?.longitud ?? geolocation.longitud
		geolocation.ciudad = geolocationData?.ciudad ?? geolocation.ciudad
		geolocation.horario = geolocationData?.horario ?? geolocation.horario
		geolocation.fotoTienda = geolocationData?.foto_tienda ?? geolocation.fotoTienda
		geolocation.telefono = geolocationData?.telefono ?? geolocation.telefono
		geolocation.updatedAt = new Date()

		await this.geoLocationRepository.save(geolocation)
	}

	async getGeolocations(storeID: number) {
		const sites = await this.geoLocationRepository.find({
			where: { tienda: storeID },
			order: { createdAt: "DESC" }
		})

		return sites.map((site) => mapGeolocation(site))
	}

	async updateProductPricing(dto: UpdateProductPricingDto) {
		const { id, unidades, precio, combinaciones, storeID } = dto

		if (precio < 0) throw new BadRequestException("Price cannot be negative")
		if (unidades < 0) throw new BadRequestException("Units cannot be negative")

		const queryRunner = this.datasource.createQueryRunner()
		await queryRunner.connect()
		await queryRunner.startTransaction()

		try {
			const product = await queryRunner.manager.findOne(this.productosRepository.target, {
				where: { id, tienda: storeID },
				relations: [
					"productosInfo",
					"productosVariantes",
					"productosVariantes.productosVariantesCombinaciones"
				]
			})

			if (!product) throw new NotFoundException("Product not found")

			product.precio = precio
			product.productosInfo.inventario = unidades

			await queryRunner.manager.save(product.productosInfo)
			await queryRunner.manager.save(product)

			if (combinaciones && combinaciones.length > 0) {
				for (const combination of combinaciones) {
					const { id: combinationID, combinaciones: combinationValue } = combination

					const combinationEntity = await queryRunner.manager.findOne(
						this.combinacionesRepository.target,
						{
							where: { id: combinationID }
						}
					)

					if (!combinationEntity) throw new NotFoundException("Combination not found")

					combinationEntity.combinaciones = combinationValue
					await queryRunner.manager.save(combinationEntity)
				}
			}

			await queryRunner.commitTransaction()
			this.logger.log("Product pricing updated successfully", "updateProductPricing")

			return { message: "Product pricing updated successfully" }
		} catch (error) {
			await queryRunner.rollbackTransaction()
			this.logger.error("Error updating product pricing", error, "updateProductPricing")
			throw new InternalServerErrorException("Error updating product pricing")
		} finally {
			await queryRunner.release()
		}
	}

	async exportSales(storeID: number, cartIDs?: Array<string>) {
		const query = this.carritosRepository
			.createQueryBuilder("carritos")
			.innerJoin("carritos.usuario2", "users")
			.innerJoin("users.ciudad2", "ciudades")
			.innerJoin("users.usersInfo", "usersInfo")
			.innerJoin("users.ciudad2", "ciudad2")
			.innerJoin("ciudad2.departamento", "departamentos")
			.innerJoin("departamentos.paises", "paises")
			.where("carritos.tienda = :storeID", { storeID })
			.select([
				"carritos.id as id",
				"users.nombre as nombre",
				"users.tipoIdentificacion as tipo_identificacion",
				"users.identificacion as identificacion",
				"users.email as email",
				"ciudades.nombreCiu as ciudad",
				"usersInfo.telefono as telefono",
				"carritos.total as total",
				"carritos.createdAt as fecha_compra",
				"carritos.metodoPago as metodo_pago",
				"carritos.cupon as cupon",
				"carritos.estado as estado",
				"paises.codigo as codigo_pais",
				"carritos.estadoEntrega as estado_entrega"
			])
			.orderBy("carritos.createdAt", "DESC")

		// Filtrar por IDs si existen
		if (cartIDs && cartIDs?.length > 0) {
			const parsedCartIDs = cartIDs.map((id) => parseInt(id))
			query.andWhere("carritos.id IN (:...cartIDs)", { cartIDs: parsedCartIDs })
		}

		const sales = await query.getRawMany()

		// Parseo de fechas y formato de moneda
		const parsedSales = sales.map((sale) => {
			sale.fecha_compra = new Date(sale.fecha_compra).toISOString().split("T")[0]
			sale.telefono = sale.telefono ? this.removeCountryCode(sale.telefono) : "N/A"
			sale.total = new Intl.NumberFormat("es-ES", {
				style: "currency",
				currency: this.mapCountrieCurrency(sale.codigo_pais)
			}).format(sale.total)
			sale.metodo_pago = prettifyShippingMethod(sale.metodo_pago)
			sale.estado = this.mapCartState(sale.estado)
			sale.cupon =
				sale.cupon === "null" ||
				sale.cupon === "" ||
				sale.cupon === "undefined" ||
				sale.cupon === null ||
				sale.cupon === undefined
					? "N/A"
					: sale.cupon
			sale.estado_entrega = this.mapDeliveryStatus(sale.estado_entrega)
			return sale
		})

		const fields = [
			"nombre",
			"tipo_identificacion",
			"identificacion",
			"email",
			"ciudad",
			"telefono",
			"total",
			"fecha_compra",
			"metodo_pago",
			"cupon",
			"estado",
			"estado_entrega"
		]

		const csv = new Parser({ fields }).parse(parsedSales)

		return {
			data: csv,
			filename: `ventas-${new Date().toISOString().split("T")[0]}.csv`
		}
	}

	async exportClients(storeID: number, clientIDs?: Array<string>) {
		const query = this.clientesRepository
			.createQueryBuilder("clientes")
			.innerJoin("clientes.user", "users")
			.innerJoin("users.ciudad2", "ciudades")
			.innerJoin("users.usersInfo", "usersInfo")
			.leftJoin("users.carritos2", "carritos", "carritos.estado = 1")
			.innerJoin("users.ciudad2", "ciudad2")
			.innerJoin("ciudad2.departamento", "departamentos")
			.innerJoin("departamentos.paises", "paises")
			.where("clientes.tienda = :storeID", { storeID })
			.select([
				"users.id as id",
				"users.nombre as nombre",
				"users.tipoIdentificacion as tipo_identificacion",
				"users.identificacion as identificacion",
				"users.email as email",
				"ciudades.nombreCiu as ciudad",
				"usersInfo.telefono as telefono",
				"CAST(COUNT(carritos.id) as UNSIGNED) as cantidad_compras",
				"SUM(carritos.total) as compras_completadas",
				"MAX(carritos.createdAt) as ultima_compra",
				"COUNT(carritos.cupon) > 0 as usuario_uso_cupon",
				"MAX(carritos.metodoPago) as metodo_pago_preferido",
				"paises.codigo as codigo_pais"
			])
			.groupBy(
				"users.id, users.nombre, users.tipoIdentificacion, users.identificacion, users.email, ciudades.nombreCiu, usersInfo.telefono"
			)

		// Filtrar por IDs si existen
		if (clientIDs && clientIDs?.length > 0) {
			const parsedClientIDs = clientIDs.map((id) => parseInt(id))
			query.andWhere("users.id IN (:...clientIDs)", { clientIDs: parsedClientIDs })
		}

		const clients = await query.getRawMany()

		// Parseo de fechas y formato de moneda
		const parsedClients = clients.map((client) => {
			client.ultima_compra = new Date(client.ultima_compra).toISOString().split("T")[0]
			client.usuario_uso_cupon = client.usuario_uso_cupon === "1" ? "SI" : "NO"
			client.telefono = client.telefono ? this.removeCountryCode(client.telefono) : "N/A"
			client.identificacion = ` ${client.identificacion}`
			client.compras_completadas = new Intl.NumberFormat("es-ES", {
				style: "currency",
				currency: this.mapCountrieCurrency(client.codigo_pais)
			}).format(client.compras_completadas)
			client.metodo_pago_preferido = prettifyShippingMethod(client.metodo_pago_preferido)
			return client
		})

		const fields = [
			"nombre",
			"tipo_identificacion",
			"identificacion",
			"email",
			"ciudad",
			"telefono",
			"cantidad_compras",
			"compras_completadas",
			"ultima_compra",
			"usuario_uso_cupon",
			"metodo_pago_preferido"
		]

		// Generar CSV
		const csv = new Parser({ fields }).parse(parsedClients)

		return {
			data: csv,
			filename: `clientes-${new Date().toISOString().split("T")[0]}.csv`
		}
	}

	mapDeliveryStatus(state: string) {
		if (state === "1") return "Pendiente"
		if (state === "2") return "En Empaque"
		if (state === "3") return "En Tránsito"
		if (state === "4") return "Devuelto"
		if (state === "5") return "Entregado"
		if (state === "6") return "Cancelado"
		return "Pendiente"
	}

	mapCartState(state: string) {
		if (state === "0") return "Sin Pagar"
		if (state === "1") return "Pagado"
		if (state === "3") return "Cancelada"
		if (state === "4") return "Despachada"
		if (state === "6") return "Entregada"
		return "Rechazada"
	}

	mapCountrieCurrency(countrieCode: string) {
		if (countrieCode.toLowerCase() === "co") return "COP"
		if (countrieCode.toLowerCase() === "internacional") return "USD"
		if (countrieCode.toLowerCase() === "mx") return "MXN"
		if (countrieCode.toLowerCase() === "ar") return "ARS"
		if (countrieCode.toLowerCase() === "cl") return "CLP"
		if (countrieCode.toLowerCase() === "pr") return "USD"
		if (countrieCode.toLowerCase() === "pe") return "PEN"
		if (countrieCode.toLowerCase() === "pan") return "USD"
		return "COP"
	}

	removeCountryCode(phone: string) {
		if (phone.startsWith("+57")) return phone.substring(3)
		if (phone.startsWith("+52")) return phone.substring(3)
		if (phone.startsWith("+54")) return phone.substring(3)
		if (phone.startsWith("+56")) return phone.substring(3)
		if (phone.startsWith("+1")) return phone.substring(2)
		if (phone.startsWith("+51")) return phone.substring(3)
		if (phone.startsWith("+507")) return phone.substring(4)
		return phone
	}

	async deleteProductDeliveryStatus(cartID: number) {
		const cart = await this.carritosRepository.findOne({ where: { id: cartID } })

		if (!cart) throw new NotFoundException("Carrito no encontrado")

		cart.deliveryStatusId = null

		await this.carritosRepository.save(cart)
	}

	async updateDeliveryStatus(deliveryStatusID: number, cartID: number) {
		const cart = await this.carritosRepository.findOne({ where: { id: cartID } })

		if (!cart) throw new NotFoundException("Carrito no encontrado")

		const deliveryStatus = await this.deliveryStatus.findOne({
			where: { id: deliveryStatusID.toString() }
		})

		if (!deliveryStatus) throw new NotFoundException("Estado de entrega no encontrado")

		cart.deliveryStatus = deliveryStatus
		cart.deliveryStatusId = deliveryStatusID.toString()

		await this.carritosRepository.save(cart)
	}

	async getDeliveryStatus() {
		return this.deliveryStatus.find()
	}

	async getShortAuxDescription(productID: number) {
		const product = await this.productosInfoRepository.findOne({ where: { id: productID } })

		if (!product) throw new NotFoundException("Producto no encontrado")

		return { shortAuxDescription: product.descripcionCortaAuxiliar }
	}

	async updateShortAuxDescription(productID: number, shortAuxDescription: string) {
		const product = await this.productosInfoRepository.findOne({ where: { id: productID } })

		if (!product) throw new NotFoundException("Producto no encontrado")
		if (shortAuxDescription.length > 150) {
			throw new BadRequestException(
				"La descripción auxiliar corta no puede tener más de 150 caracteres"
			)
		}

		product.descripcionCortaAuxiliar = shortAuxDescription

		await this.productosInfoRepository.save(product)
	}

	async getProductos(storeID: number, getProductsDtos: GetProductsDtos) {
		const { name, page, limit, categoryID, freeShipping, withVariants, favorite } = getProductsDtos

		const query = this.productosRepository
			.createQueryBuilder("productos")
			.where("productos.tienda = :storeID", { storeID })
			.andWhere("productos.activo = 1")
			.andWhere("productos.deletedAt IS NULL")
			.leftJoinAndSelect("productos.categoriaProducto2", "categoria")
			.leftJoinAndSelect("productos.subcategoria2", "subcategoria")
			.leftJoinAndSelect("productos.productosDropshippings", "dropshipping")
			.leftJoin("productos.productosInfo", "productosInfo")
			.addSelect("productosInfo.tipoServicio")
			.orderBy("productos.createdAt", "DESC")
			.skip((page - 1) * limit)
			.take(limit)

		if (name) query.where({ nombre: Like(`%${name}%`) })
		if (categoryID) query.andWhere("productos.categoriaProducto = :categoryID", { categoryID })
		if (freeShipping) query.andWhere("productos.envioGratis = :freeShipping", { freeShipping })
		if (withVariants) query.andWhere("productos.conVariante = :withVariants", { withVariants })
		if (favorite) query.andWhere("productos.favorito = :favorite", { favorite })

		const [products, total] = await query.getManyAndCount()

		const mappedProducts = products.map((product) => {
			return {
				id: product.id,
				tienda: product.tienda,
				nombre: product.nombre,
				categoria_producto: {
					id: product.categoriaProducto,
					nombre_categoria_producto: product.categoriaProducto2.nombreCategoriaProducto,
					tienda: product.categoriaProducto2.tienda,
					descripcion: product.categoriaProducto2.descripcion,
					foto_banner: product.categoriaProducto2.fotoBanner,
					orden: product.categoriaProducto2.orden,
					foto_icono: product.categoriaProducto2.fotoIcono,
					id_cloudinary: product.categoriaProducto2.idCloudinary,
					imagen_cloudinary: product.categoriaProducto2.imagenCloudinary
				},
				subcategoria: product.subcategoria,
				precio: product.precio,
				foto: product.foto,
				activo: product.activo,
				disponibilidad: product.disponibilidad,
				foto_cloudinary: product.fotoCloudinary,
				slug: product.slug,
				deleted_at: product.deletedAt,
				id_cloudinary: product.idCloudinary,
				envio_gratis: product.envioGratis,
				con_variante: product.conVariante,
				valor_compra: product.valorCompra,
				created_at: product.createdAt,
				updated_at: product.updatedAt,
				tag: product.tag,
				favorito: product.favorito,
				orden: product.orden,
				ml_published: product.mlPublished,
				id_siigo: product.idSiigo,
				marca: product.productosInfo.marca,
				promocion_valor: product.productosInfo.promocionValor,
				tag_promocion: product.productosInfo.tagPromocion,
				etiquetas: product.productosInfo.etiquetas,
				bodega: product.productosInfo.bodega,
				alto: product.productosInfo.alto,
				ancho: product.productosInfo.ancho,
				largo: product.productosInfo.largo,
				dealer_whatsapp: product.productosInfo.dealerWhatsapp,
				condicion: product.productosInfo.condicion,
				dropshipping: product.productosDropshippings.map((dropshipping) => {
					return {
						id: dropshipping.id,
						comision: dropshipping.comision,
						productos_id: dropshipping.productosId,
						created_at: dropshipping.createdAt,
						updated_at: dropshipping.updatedAt,
						estado: dropshipping.estado
					}
				})
			}
		})

		return {
			data: mappedProducts,
			pagination: {
				total: Math.ceil(total / limit),
				page: +page,
				limit: +limit,
				hasPrev: page > 1,
				hasNext: page < Math.ceil(total / limit)
			}
		}
	}
}
