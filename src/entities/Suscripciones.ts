import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("suscripciones_tiendas_id_foreign", ["tiendasId"], {})
@Entity("suscripciones", { schema: "komercia_prod" })
export class Suscripciones {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "uuid", length: 255 })
	uuid: string

	@Column("varchar", { name: "status", length: 255 })
	status: string

	@Column("varchar", { name: "payment_status", nullable: true, length: 255 })
	paymentStatus: string | null

	@Column("date", { name: "payment_expires" })
	paymentExpires: string

	@Column("longtext", { name: "url" })
	url: string

	@Column("date", { name: "period_end", nullable: true })
	periodEnd: string | null

	@Column("date", { name: "period_start", nullable: true })
	periodStart: string | null

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("varchar", { name: "suscripcion_id", length: 255 })
	suscripcionId: string

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.suscripciones, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
