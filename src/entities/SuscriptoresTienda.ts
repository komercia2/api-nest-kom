import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("suscriptores_tienda_id_tienda_foreign", ["idTienda"], {})
@Entity("suscriptores_tienda", { schema: "komercia_prod" })
export class SuscriptoresTienda {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "email", length: 255 })
	email: string

	@Column("int", { name: "id_tienda", unsigned: true })
	idTienda: number

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

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.suscriptoresTiendas, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "id_tienda", referencedColumnName: "id" }])
	idTienda2: Tiendas
}
