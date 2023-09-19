import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("mi_paquete_envio_base_tiendas_id_foreign", ["tiendasId"], {})
@Entity("mi_paquete_envio_base", { schema: "komercia_prod" })
export class MiPaqueteEnvioBase {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("int", { name: "width" })
	width: number

	@Column("int", { name: "length" })
	length: number

	@Column("int", { name: "height" })
	height: number

	@Column("int", { name: "weight" })
	weight: number

	@Column("varchar", { name: "originCity", nullable: true, length: 255 })
	originCity: string | null

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("tinyint", { name: "state", width: 1, default: () => "'0'" })
	state: boolean

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.miPaqueteEnvioBases, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
