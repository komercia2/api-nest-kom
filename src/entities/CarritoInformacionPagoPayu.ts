import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Carritos } from "./Carritos"

@Index("carrito_informacion_pago_payu_carritos_id_foreign", ["carritosId"], {})
@Entity("carrito_informacion_pago_payu", { schema: "komercia_prod" })
export class CarritoInformacionPagoPayu {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("int", { name: "orderId" })
	orderId: number

	@Column("varchar", { name: "transactionId", length: 255 })
	transactionId: string

	@Column("text", { name: "state" })
	state: string

	@Column("text", { name: "paymentNetworkResponseCode", nullable: true })
	paymentNetworkResponseCode: string | null

	@Column("text", { name: "pendingReason", nullable: true })
	pendingReason: string | null

	@Column("text", { name: "trazabilityCode", nullable: true })
	trazabilityCode: string | null

	@Column("text", { name: "authorizationCode", nullable: true })
	authorizationCode: string | null

	@Column("text", { name: "responseCode" })
	responseCode: string

	@Column("text", { name: "operationDate", nullable: true })
	operationDate: string | null

	@Column("text", { name: "paymentNetwork", nullable: true })
	paymentNetwork: string | null

	@Column("text", { name: "rejectionType", nullable: true })
	rejectionType: string | null

	@Column("text", { name: "transactionType", nullable: true })
	transactionType: string | null

	@Column("int", { name: "carritos_id", unsigned: true })
	carritosId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Carritos, (carritos) => carritos.carritoInformacionPagoPayus, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "carritos_id", referencedColumnName: "id" }])
	carritos: Carritos
}
