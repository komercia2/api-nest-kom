import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("tienda_suscripcion_stripe_tiendas_id_foreign", ["tiendasId"], {})
@Entity("tienda_suscripcion_stripe", { schema: "komercia_prod" })
export class TiendaSuscripcionStripe {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("date", { name: "period_end" })
	periodEnd: string

	@Column("date", { name: "period_start" })
	periodStart: string

	@Column("varchar", { name: "suscripcion_id", length: 255 })
	suscripcionId: string

	@Column("varchar", { name: "customer_id", length: 255 })
	customerId: string

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.tiendaSuscripcionStripes, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
