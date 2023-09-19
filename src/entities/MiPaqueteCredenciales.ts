import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"

@Index("mi_paquete_credenciales_tiendas_id_foreign", ["tiendasId"], {})
@Entity("mi_paquete_credenciales", { schema: "komercia_prod" })
export class MiPaqueteCredenciales {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "username", length: 255 })
	username: string

	@Column("varchar", { name: "pass", length: 255 })
	pass: string

	@Column("longtext", { name: "token" })
	token: string

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.miPaqueteCredenciales, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas
}
