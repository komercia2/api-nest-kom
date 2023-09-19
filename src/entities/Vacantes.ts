import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Tiendas } from "./Tiendas"
import { Users } from "./Users"

@Index("vacantes_tiendas_id_foreign", ["tiendasId"], {})
@Index("vacantes_users_id_foreign", ["usersId"], {})
@Entity("vacantes", { schema: "komercia_prod" })
export class Vacantes {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "titulo", length: 255 })
	titulo: string

	@Column("longtext", { name: "descripcion" })
	descripcion: string

	@Column("varchar", { name: "estado", length: 255 })
	estado: string

	@Column("varchar", { name: "tipo_contrato", length: 255 })
	tipoContrato: string

	@Column("varchar", { name: "presupuesto", nullable: true, length: 255 })
	presupuesto: string | null

	@Column("varchar", { name: "categoria", nullable: true, length: 255 })
	categoria: string | null

	@Column("int", { name: "tiendas_id", unsigned: true })
	tiendasId: number

	@Column("int", { name: "users_id", unsigned: true })
	usersId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("varchar", { name: "locacion", nullable: true, length: 255 })
	locacion: string | null

	@Column("varchar", { name: "como_aplicar", nullable: true, length: 255 })
	comoAplicar: string | null

	@Column("varchar", { name: "posicion", nullable: true, length: 255 })
	posicion: string | null

	@Column("varchar", { name: "categoria2", nullable: true, length: 255 })
	categoria2: string | null

	@Column("varchar", { name: "categoria3", nullable: true, length: 255 })
	categoria3: string | null

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.vacantes, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas

	@ManyToOne(() => Users, (users) => users.vacantes, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "users_id", referencedColumnName: "id" }])
	users: Users
}
