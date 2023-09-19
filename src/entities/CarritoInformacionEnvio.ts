import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Carritos } from "./Carritos"
import { Transportadoras } from "./Transportadoras"

@Index("carrito_informacion_envio_transportadora_id_foreign", ["transportadoraId"], {})
@Index("carrito_informacion_envio_carrito_id_foreign", ["carritoId"], {})
@Entity("carrito_informacion_envio", { schema: "komercia_prod" })
export class CarritoInformacionEnvio {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("varchar", { name: "numero_guia", length: 255 })
	numeroGuia: string

	@Column("int", { name: "transportadora_id", unsigned: true })
	transportadoraId: number

	@Column("int", { name: "carrito_id", unsigned: true })
	carritoId: number

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

	@ManyToOne(() => Carritos, (carritos) => carritos.carritoInformacionEnvios, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "carrito_id", referencedColumnName: "id" }])
	carrito: Carritos

	@ManyToOne(() => Transportadoras, (transportadoras) => transportadoras.carritoInformacionEnvios, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "transportadora_id", referencedColumnName: "id" }])
	transportadora: Transportadoras
}
