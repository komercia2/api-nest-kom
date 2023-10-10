import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("mensajeros_urbanos_tiendas_tiendas_id_foreign", ["tiendasId"], {})
@Entity("mensajeros_urbanos_tiendas", { schema: "komercia_prod" })
export class MensajerosUrbanosTiendas {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "name", length: 255 })
	name: string

	@Column("varchar", { name: "address", length: 255 })
	address: string

	@Column("bigint", { name: "city" })
	city: string

	@Column("varchar", { name: "city_specified", length: 255 })
	citySpecified: string

	@Column("varchar", { name: "phone", length: 255 })
	phone: string

	@Column("varchar", { name: "schedule", length: 255 })
	schedule: string

	@Column("bigint", { name: "parking" })
	parking: string

	@Column("int", { name: "tiendas_id", nullable: true, unsigned: true })
	tiendasId: number | null

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("timestamp", { name: "deleted_at", nullable: true })
	deletedAt: Date | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.mensajerosUrbanosTiendas, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
