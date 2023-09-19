import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("mercadopago_orders", { schema: "komercia_prod" })
export class MercadopagoOrders {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null
}
