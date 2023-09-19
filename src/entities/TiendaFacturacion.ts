import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"

import { FacturasDataico } from "./FacturasDataico"
import { Tiendas } from "./Tiendas"

@Index("tienda_facturacion_email_unique", ["email"], { unique: true })
@Index("tienda_facturacion_phone_unique", ["phone"], { unique: true })
@Index("tienda_facturacion_tiendas_id_foreign", ["tiendasId"], {})
@Entity("tienda_facturacion", { schema: "komercia_prod" })
export class TiendaFacturacion {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "email", unique: true, length: 255 })
	email: string

	@Column("varchar", { name: "phone", unique: true, length: 255 })
	phone: string

	@Column("varchar", { name: "party_type", length: 255 })
	partyType: string

	@Column("varchar", { name: "party_identification", length: 255 })
	partyIdentification: string

	@Column("varchar", { name: "party_identification_type", length: 255 })
	partyIdentificationType: string

	@Column("varchar", { name: "tax_level_code", length: 255 })
	taxLevelCode: string

	@Column("varchar", { name: "regimen", length: 255 })
	regimen: string

	@Column("varchar", { name: "department", length: 255 })
	department: string

	@Column("varchar", { name: "city", length: 255 })
	city: string

	@Column("varchar", { name: "address_line", length: 255 })
	addressLine: string

	@Column("varchar", { name: "company_name", nullable: true, length: 255 })
	companyName: string | null

	@Column("varchar", { name: "first_name", nullable: true, length: 255 })
	firstName: string | null

	@Column("varchar", { name: "family_name", nullable: true, length: 255 })
	familyName: string | null

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@OneToMany(() => FacturasDataico, (facturasDataico) => facturasDataico.tiendaFacturacion)
	facturasDataicos: FacturasDataico[]

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.tiendaFacturacions, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
