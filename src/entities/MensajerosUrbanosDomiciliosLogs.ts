import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { MensajerosUrbanosDomicilios } from "./MensajerosUrbanosDomicilios"

@Index("mensajeros_urbanos_domicilios_logs_domicilios_id_foreign", ["domiciliosId"], {})
@Entity("mensajeros_urbanos_domicilios_logs", { schema: "komercia_prod" })
export class MensajerosUrbanosDomiciliosLogs {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "token", length: 255 })
	token: string

	@Column("timestamp", { name: "date", default: () => "CURRENT_TIMESTAMP" })
	date: Date

	@Column("varchar", { name: "uuid", length: 255 })
	uuid: string

	@Column("varchar", { name: "mensajero", length: 255 })
	mensajero: string

	@Column("bigint", { name: "status_id" })
	statusId: string

	@Column("varchar", { name: "phone", length: 255 })
	phone: string

	@Column("bigint", { name: "num_place" })
	numPlace: string

	@Column("bigint", { name: "status_place" })
	statusPlace: string

	@Column("varchar", { name: "url", length: 255 })
	url: string

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("bigint", { name: "domicilios_id", nullable: true, unsigned: true })
	domiciliosId: string | null

	@ManyToOne(
		() => MensajerosUrbanosDomicilios,
		(mensajerosUrbanosDomicilios) => mensajerosUrbanosDomicilios.mensajerosUrbanosDomiciliosLogs,
		{ onDelete: "CASCADE", onUpdate: "NO ACTION" }
	)
	@JoinColumn([{ name: "domicilios_id", referencedColumnName: "id" }])
	domicilios: MensajerosUrbanosDomicilios
}
