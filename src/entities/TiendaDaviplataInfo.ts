import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("tienda_daviplata_info_id_tienda_foreign", ["idTienda"], {})
@Entity("tienda_daviplata_info", { schema: "komercia_prod" })
export class TiendaDaviplataInfo {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("text", { name: "referencia" })
	referencia: string

	@Column("text", { name: "comentario", nullable: true })
	comentario: string | null

	@Column("int", { name: "id_tienda", unsigned: true })
	idTienda: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.tiendaDaviplataInfos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "id_tienda", referencedColumnName: "id" }])
	idTienda2: Tiendas
}
