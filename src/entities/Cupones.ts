import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("cupones_tiendas_id_foreign", ["tiendasId"], {})
@Entity("cupones", { schema: "komercia_prod" })
export class Cupones {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "nombre", length: 255 })
	nombre: string

	@Column("varchar", { name: "codigo", length: 255 })
	codigo: string

	@Column("tinyint", { name: "estado", width: 1 })
	estado: boolean

	@Column("tinyint", { name: "tipo", width: 1 })
	tipo: boolean

	@Column("int", { name: "porcentaje_descuento", nullable: true })
	porcentajeDescuento: number | null

	@Column("int", { name: "valor_descuento", nullable: true })
	valorDescuento: number | null

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "deleted_at", nullable: true })
	deletedAt: Date | null

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("tinyint", { name: "publico", width: 1, default: () => "'0'" })
	publico: boolean

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.cupones, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
