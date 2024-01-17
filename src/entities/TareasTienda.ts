import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("tareas_tienda_id_tienda_foreign", ["idTienda"], {})
@Index("tareas_tienda_id_tarea_foreign", ["idTarea"], {})
@Entity("tareas_tienda", { schema: "komercia_prod" })
export class TareasTienda {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("tinyint", { name: "done", width: 1 })
	done: boolean

	@Column("int", { name: "id_tienda", unsigned: true })
	idTienda: number

	@Column("int", { name: "id_tarea", unsigned: true })
	idTarea: number

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

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.tareasTiendas, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "id_tienda", referencedColumnName: "id" }])
	idTienda2: Tiendas
}
