import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { EnvioClick } from "./EnvioClick"

@Index("envios_informacion_pago_mercado_pago_envios_id_foreign", ["enviosId"], {})
@Entity("envios_informacion_pago_mercado_pago", { schema: "komercia_prod" })
export class EnviosInformacionPagoMercadoPago {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("bigint", { name: "transaction_amount" })
	transactionAmount: string

	@Column("varchar", { name: "token", nullable: true, length: 255 })
	token: string | null

	@Column("text", { name: "description", nullable: true })
	description: string | null

	@Column("bigint", { name: "installments" })
	installments: string

	@Column("bigint", { name: "issuer_id", nullable: true })
	issuerId: string | null

	@Column("varchar", { name: "payment_method_id", length: 255 })
	paymentMethodId: string

	@Column("varchar", { name: "payer", length: 255 })
	payer: string

	@Column("varchar", { name: "status", length: 255 })
	status: string

	@Column("varchar", { name: "status_detail", nullable: true, length: 255 })
	statusDetail: string | null

	@Column("varchar", { name: "id_mercado_pago", length: 255 })
	idMercadoPago: string

	@Column("bigint", { name: "envios_id", unsigned: true })
	enviosId: string

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => EnvioClick, (envioClick) => envioClick.enviosInformacionPagoMercadoPagos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "envios_id", referencedColumnName: "id" }])
	envios: EnvioClick
}
