import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("tienda_siigo_info_tiendas_id_foreign", ["tiendasId"], {})
@Entity("tienda_siigo_info", { schema: "komercia_prod" })
export class TiendaSiigoInfo {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "username", length: 255 })
	username: string

	@Column("varchar", { name: "access_key", length: 255 })
	accessKey: string

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("tinyint", { name: "estado", width: 1 })
	estado: boolean

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.tiendaSiigoInfos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
