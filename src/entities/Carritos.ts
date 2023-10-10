import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"

import { CarritoInformacionEnvio } from "./CarritoInformacionEnvio"
import { CarritoInformacionPago } from "./CarritoInformacionPago"
import { CarritoInformacionPagoFlow } from "./CarritoInformacionPagoFlow"
import { CarritoInformacionPagoMercadoPago } from "./CarritoInformacionPagoMercadoPago"
import { CarritoInformacionPagoPayu } from "./CarritoInformacionPagoPayu"
import { CarritosShopify } from "./CarritosShopify"
import { DeliveryStatus } from "./DeliveryStatus"
import { EnvioClick } from "./EnvioClick"
import { EnviosMipaquete } from "./EnviosMipaquete"
import { MensajeOrden } from "./MensajeOrden"
import { MensajerosUrbanosDomicilios } from "./MensajerosUrbanosDomicilios"
import { MiPaquetePreEnvio } from "./MiPaquetePreEnvio"
import { ProductosCarritos } from "./ProductosCarritos"
import { Tiendas } from "./Tiendas"
import { Users } from "./Users"

@Index("carritos_tienda_foreign", ["tienda"], {})
@Index("carritos_usuario_foreign", ["usuario"], {})
@Index("carritos_reseller_id_foreign", ["resellerId"], {})
@Index("carritos_delivery_status_id_foreign", ["deliveryStatusId"], {})
@Entity("carritos", { schema: "komercia_prod" })
export class Carritos {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("tinyint", { name: "tipo", width: 1 })
	tipo: boolean

	@Column("int", { name: "tienda", unsigned: true })
	tienda: number

	@Column("int", { name: "usuario", unsigned: true })
	usuario: number

	@Column("int", { name: "reseller_id", nullable: true, unsigned: true })
	resellerId: number | null

	@Column("date", { name: "fecha" })
	fecha: string

	@Column("double", { name: "total", precision: 14, scale: 2 })
	total: number

	@Column("longtext", { name: "direccion_entrega" })
	direccionEntrega: string

	@Column("varchar", { name: "estado", length: 255 })
	estado: string

	@Column("datetime", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("datetime", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("varchar", { name: "costo_envio", length: 255 })
	costoEnvio: string

	@Column("varchar", { name: "metodo_pago", nullable: true, length: 255 })
	metodoPago: string | null

	@Column("timestamp", { name: "deleted_at", nullable: true })
	deletedAt: Date | null

	@Column("varchar", { name: "canal", nullable: true, length: 255 })
	canal: string | null

	@Column("tinyint", { name: "takeout", nullable: true, width: 1 })
	takeout: boolean | null

	@Column("int", {
		name: "estado_entrega",
		nullable: true,
		default: () => "'0'"
	})
	estadoEntrega: number | null

	@Column("varchar", { name: "ip", nullable: true, length: 255 })
	ip: string | null

	@Column("text", { name: "comentario", nullable: true })
	comentario: string | null

	@Column("varchar", { name: "cupon", nullable: true, length: 255 })
	cupon: string | null

	@Column("int", { name: "descuento", nullable: true })
	descuento: number | null

	@Column("longtext", { name: "transportadora", nullable: true })
	transportadora: string | null

	@Column("timestamp", { name: "delivery_updated_at", nullable: true })
	deliveryUpdatedAt: Date | null

	@Column("bigint", {
		name: "delivery_status_id",
		nullable: true,
		unsigned: true
	})
	deliveryStatusId: string | null

	@Column("varchar", { name: "status_comision", nullable: true, length: 255 })
	statusComision: string | null

	@Column("int", { name: "comision", nullable: true })
	comision: number | null

	@OneToMany(
		() => CarritoInformacionEnvio,
		(carritoInformacionEnvio) => carritoInformacionEnvio.carrito
	)
	carritoInformacionEnvios: CarritoInformacionEnvio[]

	@OneToMany(
		() => CarritoInformacionPago,
		(carritoInformacionPago) => carritoInformacionPago.xIdFactura2
	)
	carritoInformacionPagos: CarritoInformacionPago[]

	@OneToMany(
		() => CarritoInformacionPagoFlow,
		(carritoInformacionPagoFlow) => carritoInformacionPagoFlow.carritos
	)
	carritoInformacionPagoFlows: CarritoInformacionPagoFlow[]

	@OneToMany(
		() => CarritoInformacionPagoMercadoPago,
		(carritoInformacionPagoMercadoPago) => carritoInformacionPagoMercadoPago.carritos
	)
	carritoInformacionPagoMercadoPagos: CarritoInformacionPagoMercadoPago[]

	@OneToMany(
		() => CarritoInformacionPagoPayu,
		(carritoInformacionPagoPayu) => carritoInformacionPagoPayu.carritos
	)
	carritoInformacionPagoPayus: CarritoInformacionPagoPayu[]

	@ManyToOne(() => DeliveryStatus, (deliveryStatus) => deliveryStatus.carritos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "delivery_status_id", referencedColumnName: "id" }])
	deliveryStatus: DeliveryStatus

	@ManyToOne(() => Users, (users) => users.carritos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "reseller_id", referencedColumnName: "id" }])
	reseller: Users

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.carritos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda", referencedColumnName: "id" }])
	tienda2: Tiendas

	@ManyToOne(() => Users, (users) => users.carritos2, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "usuario", referencedColumnName: "id" }])
	usuario2: Users

	@OneToMany(() => CarritosShopify, (carritosShopify) => carritosShopify.carritos)
	carritosShopifies: CarritosShopify[]

	@OneToMany(() => EnvioClick, (envioClick) => envioClick.carritos)
	envioClicks: EnvioClick[]

	@OneToMany(() => EnviosMipaquete, (enviosMipaquete) => enviosMipaquete.carritos)
	enviosMipaquetes: EnviosMipaquete[]

	@OneToMany(() => MensajeOrden, (mensajeOrden) => mensajeOrden.carrito)
	mensajeOrdens: MensajeOrden[]

	@OneToMany(
		() => MensajerosUrbanosDomicilios,
		(mensajerosUrbanosDomicilios) => mensajerosUrbanosDomicilios.carritos
	)
	mensajerosUrbanosDomicilios: MensajerosUrbanosDomicilios[]

	@OneToMany(() => MiPaquetePreEnvio, (miPaquetePreEnvio) => miPaquetePreEnvio.carritos)
	miPaquetePreEnvios: MiPaquetePreEnvio[]

	@OneToMany(() => ProductosCarritos, (productosCarritos) => productosCarritos.carrito2)
	productosCarritos: ProductosCarritos[]
}
