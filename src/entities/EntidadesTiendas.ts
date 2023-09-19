import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Entidades } from "./Entidades"
import { Tiendas } from "./Tiendas"

@Index("entidades_tiendas_entidad_id_foreign", ["entidadId"], {})
@Index("entidades_tiendas_tienda_id_foreign", ["tiendaId"], {})
@Entity("entidades_tiendas", { schema: "komercia_prod" })
export class EntidadesTiendas {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("int", { name: "entidad_id", unsigned: true })
	entidadId: number

	@Column("int", { name: "tienda_id", unsigned: true })
	tiendaId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Entidades, (entidades) => entidades.entidadesTiendas, {
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "entidad_id", referencedColumnName: "id" }])
	entidad: Entidades

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.entidadesTiendas, {
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda_id", referencedColumnName: "id" }])
	tienda: Tiendas
}
