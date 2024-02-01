import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm"

import { Tiendas } from "./Tiendas"

@Entity({ name: "subscriptions_coupons" })
@Unique(["id"])
@Unique(["storeId"])
@Unique(["coupon"])
export class SubscriptionCoupon {
	@PrimaryGeneratedColumn("uuid")
	id: string

	@Column({ type: "int", unsigned: true, nullable: true })
	storeId: number

	@Column({ type: "varchar", length: 45 })
	coupon: string

	@Column({ type: "tinyint", default: 1 })
	available: number

	@Column({ type: "int", unsigned: true })
	plan: number

	@Column({ type: "int", unsigned: true })
	validMonths: number

	@Column({ type: "datetime" })
	createdAt: Date

	@Column({ type: "datetime", nullable: true })
	usedAt: Date

	@ManyToOne(() => Tiendas, (tienda) => tienda.subscriptionsCoupons, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE"
	})
	@JoinColumn({ name: "storeId" })
	store: Tiendas
}
