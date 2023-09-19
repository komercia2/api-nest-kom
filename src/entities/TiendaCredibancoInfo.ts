import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("tienda_credibanco_info_id_tienda_foreign", ["idTienda"], {})
@Entity("tienda_credibanco_info", { schema: "komercia_prod" })
export class TiendaCredibancoInfo {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "username", length: 255 })
	username: string

	@Column("varchar", { name: "password", length: 255 })
	password: string

	@Column("int", { name: "id_tienda", unsigned: true })
	idTienda: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.tiendaCredibancoInfos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "id_tienda", referencedColumnName: "id" }])
	idTienda2: Tiendas
}
