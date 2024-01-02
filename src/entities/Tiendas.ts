import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from "typeorm"

import { ApisConexiones } from "./ApisConexiones"
import { Banners } from "./Banners"
import { Carritos } from "./Carritos"
import { CarritosWhatsapp } from "./CarritosWhatsapp"
import { CategoriaProductos } from "./CategoriaProductos"
import { CategoriaTiendas } from "./CategoriaTiendas"
import { Ciudades } from "./Ciudades"
import { Clientes } from "./Clientes"
import { Cupones } from "./Cupones"
import { CustomerAccessCode } from "./CustomerAccessCode"
import { DescuentoRango } from "./DescuentoRango"
import { DisenoModal } from "./DisenoModal"
import { Disenos } from "./Disenos"
import { DominiosPeticiones } from "./DominiosPeticiones"
import { EntidadesTiendas } from "./EntidadesTiendas"
import { EnvioClick } from "./EnvioClick"
import { EnvioClickCredenciales } from "./EnvioClickCredenciales"
import { EnviosMipaquete } from "./EnviosMipaquete"
import { Geolocalizacion } from "./Geolocalizacion"
import { LogTiendas } from "./LogTiendas"
import { MedioPagos } from "./MedioPagos"
import { MediosEnvios } from "./MediosEnvios"
import { MensajerosUrbanosCredenciales } from "./MensajerosUrbanosCredenciales"
import { MensajerosUrbanosDomicilios } from "./MensajerosUrbanosDomicilios"
import { MensajerosUrbanosTiendas } from "./MensajerosUrbanosTiendas"
import { Mensajes } from "./Mensajes"
import { MiPaqueteCredenciales } from "./MiPaqueteCredenciales"
import { MiPaqueteEnvioBase } from "./MiPaqueteEnvioBase"
import { Politicas } from "./Politicas"
import { Productos } from "./Productos"
import { Proveedores } from "./Proveedores"
import { Redes } from "./Redes"
import { ReputacionTiendaMarketplace } from "./ReputacionTiendaMarketplace"
import { StoreAnalytics } from "./StoreAnalytics"
import { Subcategorias } from "./Subcategorias"
import { Subscriptions } from "./Subscriptions"
import { Suscripciones } from "./Suscripciones"
import { SuscriptoresTienda } from "./SuscriptoresTienda"
import { Tag } from "./Tag"
import { Template_5Settings } from "./Template_5Settings"
import { Template_6 } from "./Template_6"
import { TemplateGeneral } from "./TemplateGeneral"
import { TemplateWhatsappSettings } from "./TemplateWhatsappSettings"
import { TiendaBlogs } from "./TiendaBlogs"
import { TiendaConsignacionInfo } from "./TiendaConsignacionInfo"
import { TiendaContraentregaInfo } from "./TiendaContraentregaInfo"
import { TiendaCredibancoInfo } from "./TiendaCredibancoInfo"
import { TiendaCubiko } from "./TiendaCubiko"
import { TiendaDaviplataInfo } from "./TiendaDaviplataInfo"
import { TiendaDocumentos } from "./TiendaDocumentos"
import { TiendaEfectyInfo } from "./TiendaEfectyInfo"
import { TiendaEpaycoInfo } from "./TiendaEpaycoInfo"
import { TiendaFacturacion } from "./TiendaFacturacion"
import { TiendaFlowInfo } from "./TiendaFlowInfo"
import { TiendaHoko } from "./TiendaHoko"
import { TiendaMercadoPagoInfo } from "./TiendaMercadoPagoInfo"
import { TiendaNequiInfo } from "./TiendaNequiInfo"
import { TiendaPaymentsway } from "./TiendaPaymentsway"
import { TiendaPayuInfo } from "./TiendaPayuInfo"
import { TiendaPromociones } from "./TiendaPromociones"
import { TiendaRocketfy } from "./TiendaRocketfy"
import { TiendaSiigoInfo } from "./TiendaSiigoInfo"
import { TiendasInfo } from "./TiendasInfo"
import { TiendasPages } from "./TiendasPages"
import { TiendaSuscripcionStripe } from "./TiendaSuscripcionStripe"
import { TiendasUsuarios } from "./TiendasUsuarios"
import { TiendaTucompraInfo } from "./TiendaTucompraInfo"
import { TiendaWepay4uInfo } from "./TiendaWepay4uInfo"
import { TiendaWompiInfo } from "./TiendaWompiInfo"
import { Users } from "./Users"
import { Vacantes } from "./Vacantes"
import { WhatsappCheckout } from "./WhatsappCheckout"
import { Zonas } from "./Zonas"

@Index("tiendas_ciudad_foreign", ["ciudad"], {})
@Index("tiendas_categoria_foreign", ["categoria"], {})
@Entity("tiendas", { schema: "komercia_prod" })
export class Tiendas {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "nombre", length: 255 })
	nombre: string

	@Column("int", { name: "ciudad", unsigned: true })
	ciudad: number

	@Column("varchar", { name: "subdominio", length: 40 })
	subdominio: string

	@Column("int", { name: "categoria", unsigned: true })
	categoria: number

	@Column("varchar", { name: "logo", length: 255 })
	logo: string

	@Column("int", { name: "tipo" })
	tipo: number

	@Column("tinyint", { name: "activo", width: 1, default: () => "'1'" })
	activo: boolean

	@Column("tinyint", { name: "estado", width: 1, default: () => "'1'" })
	estado: boolean

	@Column("double", { name: "reputacion", precision: 22, default: () => "'0'" })
	reputacion: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("date", { name: "fecha_expiracion", nullable: true })
	fechaExpiracion: string | null

	@Column("int", { name: "template", default: () => "'3'" })
	template: number

	@Column("varchar", { name: "favicon", nullable: true, length: 255 })
	favicon: string | null

	@Column("varchar", { name: "fachada", nullable: true, length: 255 })
	fachada: string | null

	@Column("tinyint", { name: "check_whatsapp", width: 1, default: () => "'0'" })
	checkWhatsapp: boolean

	@Column("int", { name: "tipo_inventario", default: () => "'0'" })
	tipoInventario: number

	@Column("tinyint", { name: "number_verified", nullable: true, width: 1, default: () => "'0'" })
	numberVerified: boolean | null

	@OneToMany(() => ApisConexiones, (apisConexiones) => apisConexiones.tienda)
	apisConexiones: ApisConexiones[]

	@OneToMany(() => Banners, (banners) => banners.tienda2)
	banners: Banners[]

	@OneToMany(() => Carritos, (carritos) => carritos.tienda2)
	carritos: Carritos[]

	@OneToMany(() => CarritosWhatsapp, (carritosWhatsapp) => carritosWhatsapp.tiendas)
	carritosWhatsapps: CarritosWhatsapp[]

	@OneToMany(() => CategoriaProductos, (categoriaProductos) => categoriaProductos.tienda2)
	categoriaProductos: CategoriaProductos[]

	@OneToMany(() => Clientes, (clientes) => clientes.tienda)
	clientes: Clientes[]

	@OneToMany(() => Cupones, (cupones) => cupones.tiendas)
	cupones: Cupones[]

	@OneToMany(() => CustomerAccessCode, (customerAccessCode) => customerAccessCode.tiendas)
	customerAccessCodes: CustomerAccessCode[]

	@OneToMany(() => DescuentoRango, (descuentoRango) => descuentoRango.tiendas)
	descuentoRangos: DescuentoRango[]

	@OneToMany(() => DisenoModal, (disenoModal) => disenoModal.tiendas)
	disenoModals: DisenoModal[]

	@OneToOne(() => Disenos, (disenos) => disenos.idDesign2)
	disenos: Disenos

	@OneToMany(() => DominiosPeticiones, (dominiosPeticiones) => dominiosPeticiones.idTienda2)
	dominiosPeticiones: DominiosPeticiones[]

	@OneToMany(() => EntidadesTiendas, (entidadesTiendas) => entidadesTiendas.tienda)
	entidadesTiendas: EntidadesTiendas[]

	@OneToMany(() => EnvioClick, (envioClick) => envioClick.tiendas)
	envioClicks: EnvioClick[]

	@OneToMany(
		() => EnvioClickCredenciales,
		(envioClickCredenciales) => envioClickCredenciales.tiendas
	)
	envioClickCredenciales: EnvioClickCredenciales[]

	@OneToMany(() => EnviosMipaquete, (enviosMipaquete) => enviosMipaquete.tiendas)
	enviosMipaquetes: EnviosMipaquete[]

	@OneToMany(() => Geolocalizacion, (geolocalizacion) => geolocalizacion.tienda2)
	geolocalizacions: Geolocalizacion[]

	@OneToMany(() => LogTiendas, (logTiendas) => logTiendas.tienda)
	logTiendas: LogTiendas[]

	@OneToOne(() => MedioPagos, (medioPagos) => medioPagos.idMedios2)
	medioPagos: MedioPagos

	@OneToMany(() => MediosEnvios, (mediosEnvios) => mediosEnvios.idTienda2)
	mediosEnvios: MediosEnvios[]

	@OneToMany(
		() => MensajerosUrbanosCredenciales,
		(mensajerosUrbanosCredenciales) => mensajerosUrbanosCredenciales.tiendas
	)
	mensajerosUrbanosCredenciales: MensajerosUrbanosCredenciales[]

	@OneToMany(
		() => MensajerosUrbanosDomicilios,
		(mensajerosUrbanosDomicilios) => mensajerosUrbanosDomicilios.tiendas
	)
	mensajerosUrbanosDomicilios: MensajerosUrbanosDomicilios[]

	@OneToMany(
		() => MensajerosUrbanosTiendas,
		(mensajerosUrbanosTiendas) => mensajerosUrbanosTiendas.tiendas
	)
	mensajerosUrbanosTiendas: MensajerosUrbanosTiendas[]

	@OneToMany(() => Mensajes, (mensajes) => mensajes.tienda2)
	mensajes: Mensajes[]

	@OneToMany(() => MiPaqueteCredenciales, (miPaqueteCredenciales) => miPaqueteCredenciales.tiendas)
	miPaqueteCredenciales: MiPaqueteCredenciales[]

	@OneToMany(() => MiPaqueteEnvioBase, (miPaqueteEnvioBase) => miPaqueteEnvioBase.tiendas)
	miPaqueteEnvioBases: MiPaqueteEnvioBase[]

	@OneToOne(() => Politicas, (politicas) => politicas.idTienda2)
	politicas: Politicas

	@OneToMany(() => Productos, (productos) => productos.tienda2)
	productos: Productos[]

	@OneToMany(() => Proveedores, (proveedores) => proveedores.tienda)
	proveedores: Proveedores[]

	@OneToOne(() => Redes, (redes) => redes.tiendas)
	redes: Redes

	@OneToMany(
		() => ReputacionTiendaMarketplace,
		(reputacionTiendaMarketplace) => reputacionTiendaMarketplace.tienda
	)
	reputacionTiendaMarketplaces: ReputacionTiendaMarketplace[]

	@OneToMany(() => Subcategorias, (subcategorias) => subcategorias.tienda2)
	subcategorias: Subcategorias[]

	@OneToMany(() => Subscriptions, (subscriptions) => subscriptions.tienda)
	subscriptions: Subscriptions[]

	@OneToMany(() => Suscripciones, (suscripciones) => suscripciones.tiendas)
	suscripciones: Suscripciones[]

	@OneToMany(() => SuscriptoresTienda, (suscriptoresTienda) => suscriptoresTienda.idTienda2)
	suscriptoresTiendas: SuscriptoresTienda[]

	@OneToMany(() => Tag, (tag) => tag.tiendas)
	tags: Tag[]

	@OneToMany(() => Template_5Settings, (template_5Settings) => template_5Settings.tiendas)
	template_5Settings: Template_5Settings[]

	@OneToMany(() => Template_6, (template_6) => template_6.tiendas)
	templateS: Template_6[]

	@OneToMany(() => TemplateGeneral, (templateGeneral) => templateGeneral.tiendas)
	templateGenerals: TemplateGeneral[]

	@OneToMany(
		() => TemplateWhatsappSettings,
		(templateWhatsappSettings) => templateWhatsappSettings.tiendas
	)
	templateWhatsappSettings: TemplateWhatsappSettings[]

	@OneToMany(() => TiendaBlogs, (tiendaBlogs) => tiendaBlogs.tiendas)
	tiendaBlogs: TiendaBlogs[]

	@OneToMany(
		() => TiendaConsignacionInfo,
		(tiendaConsignacionInfo) => tiendaConsignacionInfo.tienda
	)
	tiendaConsignacionInfos: TiendaConsignacionInfo[]

	@OneToMany(
		() => TiendaContraentregaInfo,
		(tiendaContraentregaInfo) => tiendaContraentregaInfo.idTienda2
	)
	tiendaContraentregaInfos: TiendaContraentregaInfo[]

	@OneToMany(() => TiendaCredibancoInfo, (tiendaCredibancoInfo) => tiendaCredibancoInfo.idTienda2)
	tiendaCredibancoInfos: TiendaCredibancoInfo[]

	@OneToMany(() => TiendaCubiko, (tiendaCubiko) => tiendaCubiko.tiendas)
	tiendaCubikos: TiendaCubiko[]

	@OneToMany(() => TiendaDaviplataInfo, (tiendaDaviplataInfo) => tiendaDaviplataInfo.idTienda2)
	tiendaDaviplataInfos: TiendaDaviplataInfo[]

	@OneToMany(() => TiendaDocumentos, (tiendaDocumentos) => tiendaDocumentos.tienda)
	tiendaDocumentos: TiendaDocumentos[]

	@OneToMany(() => TiendaEfectyInfo, (tiendaEfectyInfo) => tiendaEfectyInfo.tienda)
	tiendaEfectyInfos: TiendaEfectyInfo[]

	@OneToMany(() => TiendaEpaycoInfo, (tiendaEpaycoInfo) => tiendaEpaycoInfo.idTienda2)
	tiendaEpaycoInfos: TiendaEpaycoInfo[]

	@OneToMany(() => TiendaFacturacion, (tiendaFacturacion) => tiendaFacturacion.tiendas)
	tiendaFacturacions: TiendaFacturacion[]

	@OneToMany(() => TiendaFlowInfo, (tiendaFlowInfo) => tiendaFlowInfo.tiendas)
	tiendaFlowInfos: TiendaFlowInfo[]

	@OneToMany(() => TiendaHoko, (tiendaHoko) => tiendaHoko.tiendas)
	tiendaHokos: TiendaHoko[]

	@OneToMany(
		() => TiendaMercadoPagoInfo,
		(tiendaMercadoPagoInfo) => tiendaMercadoPagoInfo.idTienda2
	)
	tiendaMercadoPagoInfos: TiendaMercadoPagoInfo[]

	@OneToMany(() => TiendaNequiInfo, (tiendaNequiInfo) => tiendaNequiInfo.idTienda2)
	tiendaNequiInfos: TiendaNequiInfo[]

	@OneToMany(() => TiendaPaymentsway, (tiendaPaymentsway) => tiendaPaymentsway.tiendas)
	tiendaPaymentsways: TiendaPaymentsway[]

	@OneToMany(() => TiendaPayuInfo, (tiendaPayuInfo) => tiendaPayuInfo.tienda)
	tiendaPayuInfos: TiendaPayuInfo[]

	@OneToMany(() => TiendaPromociones, (tiendaPromociones) => tiendaPromociones.idTienda2)
	tiendaPromociones: TiendaPromociones[]

	@OneToMany(() => TiendaRocketfy, (tiendaRocketfy) => tiendaRocketfy.tiendas)
	tiendaRocketfies: TiendaRocketfy[]

	@OneToMany(() => TiendaSiigoInfo, (tiendaSiigoInfo) => tiendaSiigoInfo.tiendas)
	tiendaSiigoInfos: TiendaSiigoInfo[]

	@OneToMany(
		() => TiendaSuscripcionStripe,
		(tiendaSuscripcionStripe) => tiendaSuscripcionStripe.tiendas
	)
	tiendaSuscripcionStripes: TiendaSuscripcionStripe[]

	@OneToMany(() => TiendaTucompraInfo, (tiendaTucompraInfo) => tiendaTucompraInfo.tiendas)
	tiendaTucompraInfos: TiendaTucompraInfo[]

	@OneToMany(() => TiendaWepay4uInfo, (tiendaWepay4uInfo) => tiendaWepay4uInfo.tiendas)
	tiendaWepay4uInfos: TiendaWepay4uInfo[]

	@OneToMany(() => TiendaWompiInfo, (tiendaWompiInfo) => tiendaWompiInfo.idTienda2)
	tiendaWompiInfos: TiendaWompiInfo[]

	@ManyToOne(() => CategoriaTiendas, (categoriaTiendas) => categoriaTiendas.tiendas, {
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "categoria", referencedColumnName: "id" }])
	categoria2: CategoriaTiendas

	@ManyToOne(() => Ciudades, (ciudades) => ciudades.tiendas, {
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "ciudad", referencedColumnName: "id" }])
	ciudad2: Ciudades

	@OneToOne(() => TiendasInfo, (tiendasInfo) => tiendasInfo.tiendaInfo2)
	tiendasInfo: TiendasInfo

	@OneToOne(() => TiendasPages, (tiendasPages) => tiendasPages.tiendaPage2)
	tiendasPages: TiendasPages

	@OneToMany(() => TiendasUsuarios, (tiendasUsuarios) => tiendasUsuarios.tiendas)
	tiendasUsuarios: TiendasUsuarios[]

	@OneToMany(() => Users, (users) => users.tienda2)
	users: Users[]

	@OneToMany(() => Vacantes, (vacantes) => vacantes.tiendas)
	vacantes: Vacantes[]

	@OneToMany(() => WhatsappCheckout, (whatsappCheckout) => whatsappCheckout.tiendas)
	whatsappCheckouts: WhatsappCheckout[]

	@OneToMany(() => Zonas, (zonas) => zonas.tiendas)
	zonas: Zonas[]

	@OneToMany(() => StoreAnalytics, (storeAnalytics) => storeAnalytics.storeId)
	analytics: StoreAnalytics[]
}
