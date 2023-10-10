import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("tienda_rocketfy_tiendas_id_foreign", ["tiendasId"], {})
@Entity("tienda_rocketfy", { schema: "komercia_prod" })
export class TiendaRocketfy {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("tinyint", { name: "estado", width: 1 })
	estado: boolean

	@Column("varchar", { name: "nombre", length: 255 })
	nombre: string

	@Column("longtext", { name: "api_key" })
	apiKey: string

	@Column("varchar", { name: "email", nullable: true, length: 255 })
	email: string | null

	@Column("varchar", { name: "customer_id", length: 255 })
	customerId: string

	@Column("varchar", { name: "customer_domain", length: 255 })
	customerDomain: string

	@Column("longtext", { name: "redirect_url" })
	redirectUrl: string

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.tiendaRocketfies, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
