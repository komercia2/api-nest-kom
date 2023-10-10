import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("tienda_hoko_tiendas_id_foreign", ["tiendasId"], {})
@Entity("tienda_hoko", { schema: "komercia_prod" })
export class TiendaHoko {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "user", length: 255 })
	user: string

	@Column("varchar", { name: "pass", length: 255 })
	pass: string

	@Column("longtext", { name: "token", nullable: true })
	token: string | null

	@Column("tinyint", { name: "statehoko", width: 1 })
	statehoko: boolean

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.tiendaHokos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
