import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Carritos } from "./Carritos"

@Index("carrito_informacion_pago_flow_carritos_id_foreign", ["carritosId"], {})
@Entity("carrito_informacion_pago_flow", { schema: "komercia_prod" })
export class CarritoInformacionPagoFlow {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("int", { name: "monto" })
	monto: number

	@Column("varchar", { name: "token", length: 255 })
	token: string

	@Column("text", { name: "flow_order" })
	flowOrder: string

	@Column("varchar", { name: "status", length: 255 })
	status: string

	@Column("int", { name: "carritos_id", unsigned: true })
	carritosId: number

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@ManyToOne(() => Carritos, (carritos) => carritos.carritoInformacionPagoFlows, {
		onDelete: "CASCADE",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "carritos_id", referencedColumnName: "id" }])
	carritos: Carritos
}
