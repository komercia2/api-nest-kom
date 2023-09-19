import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("epayco_logs", { schema: "komercia_prod" })
export class EpaycoLogs {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "x_ref_payco", length: 255 })
	xRefPayco: string

	@Column("varchar", { name: "x_cod_transaction_state", length: 255 })
	xCodTransactionState: string

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null
}
