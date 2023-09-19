import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm"

import { Carritos } from "./Carritos"
import { MensajerosUrbanosDomiciliosLogs } from "./MensajerosUrbanosDomiciliosLogs"
import { Tiendas } from "./Tiendas"

@Index("mensajeros_urbanos_domicilios_carritos_id_foreign", ["carritosId"], {})
@Index("mensajeros_urbanos_domicilios_tiendas_id_foreign", ["tiendasId"], {})
@Entity("mensajeros_urbanos_domicilios", { schema: "komercia_prod" })
export class MensajerosUrbanosDomicilios {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("bigint", { name: "total_service" })
	totalService: string

	@Column("text", { name: "observation", nullable: true })
	observation: string | null

	@Column("int", { name: "status", nullable: true })
	status: number | null

	@Column("int", { name: "carritos_id", nullable: true, unsigned: true })
	carritosId: number | null

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("varchar", { name: "uuid", length: 255 })
	uuid: string

	@Column("int", { name: "tiendas_id", nullable: true, unsigned: true })
	tiendasId: number | null

	@Column("varchar", { name: "finish_status", nullable: true, length: 255 })
	finishStatus: string | null

	@ManyToOne(() => Carritos, (carritos) => carritos.mensajerosUrbanosDomicilios, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "carritos_id", referencedColumnName: "id" }])
	carritos: Carritos

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.mensajerosUrbanosDomicilios, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tiendas_id", referencedColumnName: "id" }])
	tiendas: Tiendas

	@OneToMany(
		() => MensajerosUrbanosDomiciliosLogs,
		(mensajerosUrbanosDomiciliosLogs) => mensajerosUrbanosDomiciliosLogs.domicilios
	)
	mensajerosUrbanosDomiciliosLogs: MensajerosUrbanosDomiciliosLogs[]
}
