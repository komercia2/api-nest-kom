import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { CarritoInformacionEnvio } from "./CarritoInformacionEnvio"

@Entity("transportadoras", { schema: "komercia_prod" })
export class Transportadoras {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "nombre", length: 255 })
	nombre: string

	@Column("tinyint", { name: "estado", width: 1 })
	estado: boolean

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

	@OneToMany(
		() => CarritoInformacionEnvio,
		(carritoInformacionEnvio) => carritoInformacionEnvio.transportadora
	)
	carritoInformacionEnvios: CarritoInformacionEnvio[]
}
