import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { Carritos } from "./Carritos"

@Entity("delivery_status", { schema: "komercia_prod" })
export class DeliveryStatus {
	@PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
	id: string

	@Column("varchar", { name: "estado", length: 255 })
	estado: string

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@OneToMany(() => Carritos, (carritos) => carritos.deliveryStatus)
	carritos: Carritos[]
}
