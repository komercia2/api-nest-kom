import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { EntidadesTiendas } from "./EntidadesTiendas"

@Entity("entidades", { schema: "komercia_prod" })
export class Entidades {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "nombre", length: 255 })
	nombre: string

	@Column("varchar", { name: "logo", nullable: true, length: 255 })
	logo: string | null

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@OneToMany(() => EntidadesTiendas, (entidadesTiendas) => entidadesTiendas.entidad)
	entidadesTiendas: EntidadesTiendas[]
}
