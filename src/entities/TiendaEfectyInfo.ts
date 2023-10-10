import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("tienda_efecty_info_tienda_id_foreign", ["tiendaId"], {})
@Entity("tienda_efecty_info", { schema: "komercia_prod" })
export class TiendaEfectyInfo {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "referencia", length: 255 })
	referencia: string

	@Column("varchar", { name: "nombre", length: 55 })
	nombre: string

	@Column("varchar", { name: "telefono", length: 55 })
	telefono: string

	@Column("int", { name: "tienda_id", unsigned: true })
	tiendaId: number

	@Column("timestamp", {
		name: "created_at",
		default: () => "'0000-00-00 00:00:00'"
	})
	createdAt: Date

	@Column("timestamp", {
		name: "updated_at",
		default: () => "'0000-00-00 00:00:00'"
	})
	updatedAt: Date

	@Column("text", { name: "comentario", nullable: true })
	comentario: string | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.tiendaEfectyInfos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda_id", referencedColumnName: "id" }])
	tienda: Tiendas
}
