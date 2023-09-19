import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Carritos } from "./Carritos"

@Index("carrito_informacion_pago_mercado_pago_carritos_id_foreign", ["carritosId"], {})
@Entity("carrito_informacion_pago_mercado_pago", { schema: "komercia_prod" })
export class CarritoInformacionPagoMercadoPago {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("int", { name: "transaction_amount" })
	transactionAmount: number

	@Column("varchar", { name: "token", nullable: true, length: 255 })
	token: string | null

	@Column("text", { name: "description", nullable: true })
	description: string | null

	@Column("int", { name: "installments" })
	installments: number

	@Column("int", { name: "issuer_id", nullable: true })
	issuerId: number | null

	@Column("varchar", { name: "payment_method_id", length: 255 })
	paymentMethodId: string

	@Column("varchar", { name: "payer", length: 255 })
	payer: string

	@Column("varchar", { name: "status", length: 255 })
	status: string

	@Column("varchar", { name: "status_detail", nullable: true, length: 255 })
	statusDetail: string | null

	@Column("varchar", { name: "id_mercado_pago", length: 200 })
	idMercadoPago: string

	@Column("int", { name: "carritos_id", unsigned: true })
	carritosId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Carritos, (carritos) => carritos.carritoInformacionPagoMercadoPagos, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "carritos_id", referencedColumnName: "id" }])
	carritos: Carritos
}
