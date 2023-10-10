import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"
import { Users } from "./Users"

@Index("log_tiendas_tienda_id_foreign", ["tiendaId"], {})
@Index("log_tiendas_usuario_id_foreign", ["usuarioId"], {})
@Entity("log_tiendas", { schema: "komercia_prod" })
export class LogTiendas {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("text", { name: "accion" })
	accion: string

	@Column("int", { name: "tienda_id", unsigned: true })
	tiendaId: number

	@Column("int", { name: "usuario_id", unsigned: true })
	usuarioId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.logTiendas, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda_id", referencedColumnName: "id" }])
	tienda: Tiendas

	@ManyToOne(() => Users, (users) => users.logTiendas, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "usuario_id", referencedColumnName: "id" }])
	usuario: Users
}
