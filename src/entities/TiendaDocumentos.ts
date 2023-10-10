import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("tienda_documentos_tienda_id_foreign", ["tiendaId"], {})
@Entity("tienda_documentos", { schema: "komercia_prod" })
export class TiendaDocumentos {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "requisito", length: 255 })
	requisito: string

	@Column("varchar", { name: "documento", length: 255 })
	documento: string

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

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.tiendaDocumentos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda_id", referencedColumnName: "id" }])
	tienda: Tiendas
}
