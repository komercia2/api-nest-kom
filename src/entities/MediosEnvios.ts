import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Paises } from "./Paises"
import { Tiendas } from "./Tiendas"

@Index("medios_envios_id_pais_foreign", ["idPais"], {})
@Index("medios_envios_id_tienda_foreign", ["idTienda"], {})
@Entity("medios_envios", { schema: "komercia_prod" })
export class MediosEnvios {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("text", { name: "valores" })
	valores: string

	@Column("tinyint", { name: "estado", width: 1 })
	estado: boolean

	@Column("int", { name: "id_pais", unsigned: true })
	idPais: number

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

	@ManyToOne(() => Paises, (paises) => paises.mediosEnvios, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "id_pais", referencedColumnName: "id" }])
	idPais2: Paises

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.mediosEnvios, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "id_tienda", referencedColumnName: "id" }])
	idTienda2: Tiendas
}
