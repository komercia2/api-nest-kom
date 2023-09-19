import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"

import { Carritos } from "./Carritos"
import { EnviosInformacionPagoMercadoPago } from "./EnviosInformacionPagoMercadoPago"
import { Tiendas } from "./Tiendas"

@Index("envios_tiendas_id_foreign", ["tiendasId"], {})
@Index("envios_carritos_id_foreign", ["carritosId"], {})
@Entity("envio_click", { schema: "komercia_prod" })
export class EnvioClick {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("int", { name: "id_rate", nullable: true })
	idRate: number | null

	@Column("varchar", {
		name: "my_shipment_reference",
		nullable: true,
		length: 255
	})
	myShipmentReference: string | null

	@Column("varchar", { name: "request_pickup", length: 255 })
	requestPickup: string

	@Column("varchar", {
		name: "pickup_date",
		nullable: true,
		length: 255,
		default: () => "'0'"
	})
	pickupDate: string | null

	@Column("varchar", { name: "insurance", nullable: true, length: 255 })
	insurance: string | null

	@Column("varchar", { name: "thermal_label", nullable: true, length: 255 })
	thermalLabel: string | null

	@Column("varchar", { name: "description", nullable: true, length: 255 })
	description: string | null

	@Column("double", { name: "content_value", nullable: true, precision: 22 })
	contentValue: number | null

	@Column("double", { name: "weight", precision: 8, scale: 2 })
	weight: number

	@Column("double", { name: "length", precision: 8, scale: 2 })
	length: number

	@Column("double", { name: "height", precision: 8, scale: 2 })
	height: number

	@Column("double", { name: "width", precision: 8, scale: 2 })
	width: number

	@Column("varchar", { name: "origin_company", nullable: true, length: 255 })
	originCompany: string | null

	@Column("varchar", { name: "origin_first_name", length: 255 })
	originFirstName: string

	@Column("varchar", { name: "origin_last_name", length: 255 })
	originLastName: string

	@Column("varchar", { name: "origin_email", length: 255 })
	originEmail: string

	@Column("varchar", { name: "origin_phone", length: 255 })
	originPhone: string

	@Column("varchar", { name: "origin_street", length: 255 })
	originStreet: string

	@Column("varchar", { name: "origin_number", length: 255 })
	originNumber: string

	@Column("varchar", { name: "origin_suburb", length: 255 })
	originSuburb: string

	@Column("varchar", { name: "origin_cross_street", length: 255 })
	originCrossStreet: string

	@Column("varchar", { name: "origin_reference", length: 255 })
	originReference: string

	@Column("varchar", { name: "origin_code", length: 255 })
	originCode: string

	@Column("varchar", {
		name: "destination_company",
		nullable: true,
		length: 255
	})
	destinationCompany: string | null

	@Column("varchar", { name: "destination_first_name", length: 255 })
	destinationFirstName: string

	@Column("varchar", { name: "destination_last_name", length: 255 })
	destinationLastName: string

	@Column("varchar", { name: "destination_email", length: 255 })
	destinationEmail: string

	@Column("varchar", { name: "destination_phone", length: 255 })
	destinationPhone: string

	@Column("varchar", { name: "destination_street", length: 255 })
	destinationStreet: string

	@Column("varchar", { name: "destination_number", length: 255 })
	destinationNumber: string

	@Column("varchar", { name: "destination_suburb", length: 255 })
	destinationSuburb: string

	@Column("varchar", { name: "destination_cross_street", length: 255 })
	destinationCrossStreet: string

	@Column("varchar", { name: "destination_reference", length: 255 })
	destinationReference: string

	@Column("varchar", { name: "destination_code", length: 255 })
	destinationCode: string

	@Column("longtext", { name: "guide", nullable: true })
	guide: string | null

	@Column("varchar", { name: "url", nullable: true, length: 255 })
	url: string | null

	@Column("varchar", { name: "tracker", nullable: true, length: 255 })
	tracker: string | null

	@Column("varchar", { name: "id_order", nullable: true, length: 255 })
	idOrder: string | null

	@Column("int", { name: "status" })
	status: number

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("int", { name: "carritos_id", nullable: true, unsigned: true })
	carritosId: number | null

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("timestamp", { name: "deleted_at", nullable: true })
	deletedAt: Date | null

	@ManyToOne(() => Carritos, (carritos) => carritos.envioClicks, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "carritos_id", referencedColumnName: "id" }])
	carritos: Carritos

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.envioClicks, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas

	@OneToMany(
		() => EnviosInformacionPagoMercadoPago,
		(enviosInformacionPagoMercadoPago) => enviosInformacionPagoMercadoPago.envios
	)
	enviosInformacionPagoMercadoPagos: EnviosInformacionPagoMercadoPago[]
}
